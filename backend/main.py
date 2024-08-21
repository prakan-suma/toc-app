import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import aiohttp
from bs4 import BeautifulSoup
import re
import csv
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://toc-app-fe.onrender.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scraped_manga_list = None

class Scraping:
    def __init__(self):
        self.soup = None
        self.list_page = []
        self.next_page_pattern = re.compile(
            r'class="next page-numbers".*?href="(.*?)"', re.DOTALL)
        self.genre_url_pattern = re.compile(
            r'<a href="(.*?)".*?title="View all series in (.*?)"', re.DOTALL)
        self.detail_pattern = re.compile(
            r'<div class="seriestuhead">.*?itemprop="name">(.*?)</h1>.*?<img.*?src="(.*?)".*?<div class="info-box-views">.*?class="num">\n(.*?)</div>',
            re.DOTALL
        )

    async def fetch(self, session, url):
        async with session.get(url) as response:
            if response.status != 200:
                return None
            return await response.text()

    async def fetch_page(self, session, url):
        html = await self.fetch(session, url)
        if html:
            return BeautifulSoup(html, 'html.parser')
        return None

    async def fetch_all(self, session, urls):
        tasks = [self.fetch_page(session, url) for url in urls]
        return await asyncio.gather(*tasks)

    def extract_with_regex(self, pattern, context=None):
        if context is None:
            context = self.soup
        return pattern.findall(str(context))

    def filter_data(self, data, st, en):
        return [{'name': data[i][1], 'link': [data[i][0]]} for i in range(st, en + 1)]

    async def scrape_manga(self):
        global scraped_manga_list
        async with aiohttp.ClientSession() as session:
            root_html = await self.fetch(session, 'https://one-manga.com/manga/')
            if not root_html:
                raise HTTPException(
                    status_code=500, detail="Failed to fetch the root page")

            self.soup = BeautifulSoup(root_html, 'html.parser')

            genre_class = self.soup.find_all(class_=re.compile("section"))
            genre_url = self.extract_with_regex(
                self.genre_url_pattern, genre_class)
            genre_url_filter = self.filter_data(genre_url, 10, 26)

            results = await self.fetch_all(session, [url['link'][0] for url in genre_url_filter])

            count = 1
            manga_list = []

            for deep_detail, soup in zip(genre_url_filter, results):
                if soup:
                    urls_to_scrape = self.extract_with_regex(re.compile(
                        r'<a href="(.*?)"'), soup.find_all(class_='bsx'))
                    page_soups = await self.fetch_all(session, urls_to_scrape)

                    for page_soup in page_soups:
                        if page_soup:
                            html_container = page_soup.find_all(
                                class_='seriestucon')
                            details = self.extract_with_regex(
                                self.detail_pattern, html_container)
                            if details:
                                x, y, z = details[0]
                                manga_list.append({
                                    'id': count,
                                    'name': x,
                                    'image_url': y,
                                    'rate': z,
                                    'category': deep_detail['name']
                                })
                                count += 1

            if not manga_list:
                raise HTTPException(status_code=404, detail="No data found")

            scraped_manga_list = manga_list

            return manga_list


@app.get("/scrape")
async def scrape_manga():
    bs = Scraping()
    manga_list = await bs.scrape_manga()
    return manga_list


@app.get("/download-csv")
async def download_csv():
    global scraped_manga_list
    if not scraped_manga_list:
        raise HTTPException(status_code=404, detail="No data available. Please scrape first.")
    
    # Create an in-memory file object
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['Name'])  # Header
    for manga in scraped_manga_list:
        writer.writerow([manga['name']])
    
    output.seek(0)  # Reset the pointer to the start of the stream
    return StreamingResponse(output, media_type='text/csv', headers={
        "Content-Disposition": "attachment; filename=manga_list.csv"
    })


@app.get("/")
def read_root():
    return {"message": "Hello TOC Project"}
