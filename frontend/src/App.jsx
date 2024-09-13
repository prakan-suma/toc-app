import Search from "./components/Search";
import TypeSelect from "./components/TypeSelect";
import ResultCartoon from "./components/ResultCartoon";
import FilterAlphabet from "./components/FilterAlphabet";
import PaginationContent from "./components/PaginationContent";
import { createContext, useEffect, useState } from "react";
import Skeleton from "./components/Skeleton";

export const ContextCartoon = createContext();

function App() {
  const [res, setRes] = useState("");
  const [cartoons, setCartoons] = useState([]);
  const [showCartoons, setShowCartoons] = useState([]);
  const [error, setError] = useState(false);
  const [scrapeStatus, setScrapeStatus] = useState(false);

  const CACHE_TIME = 1000 * 60 * 60; // 1 ชั่วโมง



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://toc-app-be.onrender.com");
        // const response = await fetch("http://localhost:8000");

        const result = await response.json();
        setRes(result);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };

    const fetchCartoons = async () => {
      try {
        const cachedData = localStorage.getItem("cartoons");
        const cachedTime = localStorage.getItem("cartoonsTimestamp");

        if (cachedData && cachedTime && Date.now() - cachedTime < CACHE_TIME) {
          setCartoons(JSON.parse(cachedData));
        } else {
          const response = await fetch("https://toc-app-be.onrender.com/scrape");
          // const response = await fetch("http://localhost:8000/scrape");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setCartoons(result);
          setShowCartoons(result);
          localStorage.setItem("cartoons", JSON.stringify(result));
          localStorage.setItem("cartoonsTimestamp", Date.now());
          console.log(setScrapeStatus(true));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchCartoons();
  }, []);

  // ฟังก์ชันกรองข้อมูลตามคำค้นหา
  const handleSearch = (searchTerm) => {
    const filteredCartoons = cartoons.filter((cartoon) =>
      cartoon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setShowCartoons(filteredCartoons);
  };

  const downloadCSV = async () => {
    try {
      // const response = await fetch("http://localhost:8000/download-csv");
      const response = await fetch("https://toc-app-be.onrender.com/download-csv");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "manga_list.csv"; // The name of the file when it's downloaded
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download CSV:", error);
    }
  };

  return (
    <ContextCartoon.Provider
      value={{ cartoons, showCartoons, setShowCartoons }}
    >
      <section className="text-center">
        {error ? (
          <>
            <p className="text-3xl font-bold text-red-600 my-6">
              Backend not responding...
            </p>
            <p>Run backend ด้วยงับ</p>
          </>
        ) : res ? (
          <>
            <div>
              <h1 className="text-3xl font-bold text-blue-700 my-6 tailwind-icon">
                {res.message}
              </h1>
              <button
                disabled={!(cartoons && cartoons.length >= 1)}
                onClick={downloadCSV}
                className={`my-6 rounded-full text-white px-6 py-2 ${!(cartoons && cartoons.length >= 1)
                  ? "bg-slate-500"
                  : "bg-green-600 hover:bg-green-500"
                  } `}
              >
                Export CSV
              </button>
            </div>
            {/* cartoon display */}
            {cartoons && cartoons.length >= 1 ? (
              <section className="container max-w-5xl my-12 mx-auto">
                <div className="flex gap-4 card">
                  <section className="flex flex-col gap-2">
                    <Search onSearch={handleSearch} />
                    <TypeSelect />
                    <ResultCartoon />
                  </section>
                  <section>
                    <FilterAlphabet />
                    <PaginationContent data={showCartoons} />
                  </section>
                </div>
              </section>
            ) : (
              <>
                <div className="">
                  <div className="loader center mx-auto my-5 text-yellow-300"></div>
                  <p className="text-lg font-medium">กำลัง Scraping</p>
                  <p className="text-slate-400">ใช้เวลา ประมาณ 3-5 นาที</p>
                </div>
                <Skeleton />
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-blue-500 my-6 tailwind-icon">
              Loading...
            </h1>
            <p>Please wait, the backend is starting itself automatically.</p>

            <Skeleton />
          </>
        )}
      </section>
    </ContextCartoon.Provider>
  );
}

export default App;
