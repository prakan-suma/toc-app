import asyncio
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import aiohttp
from bs4 import BeautifulSoup
import re

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://toc-app-fe.onrender.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
        self.unwanted_genres = ['18+', 'Adult', 'Adulto', 'Ecchi', 'Harem']

    def find_class_by_bs4(self, soup, class_name):
        return soup.find_all(class_=re.compile(class_name))

    def find_re(self, pattern, context):
        return pattern.findall(str(context))

    async def fetch(self, session, url):
        try:
            async with session.get(url) as response:
                if response.status != 200:
                    logger.error(f"Failed to fetch URL: {
                                 url}, Status code: {response.status}")
                    return None
                logger.info(f"Successfully fetched URL: {url}")
                return await response.text()
        except Exception as e:
            logger.exception(f"Exception occurred while fetching URL: {
                             url} - {str(e)}")
            return None

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
        async with aiohttp.ClientSession() as session:
            root_html = await self.fetch(session, 'https://one-manga.com/manga/')
            if not root_html:
                logger.error("Failed to fetch the root page")
                raise HTTPException(
                    status_code=500, detail="Failed to fetch the root page")

            self.soup = BeautifulSoup(root_html, 'html.parser')
            logger.info("Fetched and parsed root page")

            genre_class = self.soup.find_all(class_=re.compile("section"))
            genre_url = self.extract_with_regex(
                self.genre_url_pattern, genre_class)
            genre_url_filter = self.filter_data(genre_url, 0, 26)

            logger.info(f"Found {len(genre_url_filter)} genres to scrape")

            results = await self.fetch_all(session, [url['link'][0] for url in genre_url_filter])

            count = 1
            manga_list = []

            for deep_detail, soup in zip(genre_url_filter, results):
                if soup:
                    logger.info(f"Processing genre: {deep_detail['name']}")
                    urls_to_scrape = self.extract_with_regex(re.compile(
                        r'<a href="(.*?)"'), soup.find_all(class_='bsx'))
                    page_soups = await self.fetch_all(session, urls_to_scrape)

                    for page_soup in page_soups:
                        if page_soup:
                            not_select_page = self.find_class_by_bs4(
                                page_soup, 'seriestugenre')
                            un_page = self.find_re(re.compile(
                                r'<a[^>]*>([^<]+)</a>'), not_select_page)

                            if all(x not in un_page for x in self.unwanted_genres):
                                html_container = self.find_class_by_bs4(
                                    page_soup, 'seriestucon')
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
                                    logger.info(f"Added manga: {x}")
                                    count += 1

            if not manga_list:
                logger.warning("No data found after filtering")
                raise HTTPException(status_code=404, detail="No data found")

            logger.info(f"Scraping completed. Total mangas scraped: {
                        len(manga_list)}")
            return manga_list


@app.get("/scrape")
async def scrape_manga():
    logger.info("Scrape manga endpoint called")
    bs = Scraping()
    return await bs.scrape_manga()


@app.get("/")
def read_root():
    logger.info("Root endpoint called")
    return {"message": "Hello TOC Project"}
