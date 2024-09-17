import Search from "./components/Search";
import TypeSelect from "./components/TypeSelect";
import ResultCartoon from "./components/ResultCartoon";
import FilterAlphabet from "./components/FilterAlphabet";
import PaginationContent from "./components/PaginationContent";
import { createContext, useEffect, useState } from "react";
import Skeleton from "./components/Skeleton";

import { CiExport } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

export const ContextCartoon = createContext();

function App() {
  const [res, setRes] = useState("");
  const [cartoons, setCartoons] = useState([]);
  const [showCartoons, setShowCartoons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [isScraping, setIsScraping] = useState(false); // Add state for scraping status
  const CACHE_TIME = 1000 * 60 * 60; // 1 hour

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://toc-app-be.onrender.com");
        const result = await response.json();
        setRes(result);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
        console.log(error);
      }
    };

    const fetchCartoons = async () => {
      try {
        const cachedData = localStorage.getItem("cartoons");
        const cachedTime = localStorage.getItem("cartoonsTimestamp");

        if (cachedData && cachedTime && Date.now() - cachedTime < CACHE_TIME) {
          setCartoons(JSON.parse(cachedData));
          setShowCartoons(JSON.parse(cachedData));
          setIsLoading(false);
        } else {
          setIsScraping(true); // Set scraping status to true
          const response = await fetch("https://toc-app-be.onrender.com/scrape");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setCartoons(result);
          setShowCartoons(result);
          localStorage.setItem("cartoons", JSON.stringify(result));
          localStorage.setItem("cartoonsTimestamp", Date.now());
          setIsScraping(false); // Set scraping status to false
          setIsLoading(false);
        }
      } catch (error) {
        setIsScraping(false); // Ensure scraping status is reset
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
    fetchCartoons();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredCartoons = cartoons.filter((cartoon) =>
      cartoon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setShowCartoons(filteredCartoons);
  };

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    setCurrentPage(0);
  };

  const downloadCSV = async () => {
    try {
      const cachedData = localStorage.getItem("cartoons");

      if (cachedData) {
        // Use cached data
        const data = JSON.parse(cachedData);
        const csvContent = "data:text/csv;charset=utf-8,"
          + data.map(item => item.name).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "manga_list.csv");
        document.body.appendChild(link);
        link.click();
      } else {
        // Fetch from backend
        const response = await fetch("https://toc-app-be.onrender.com/download-csv");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "manga_list.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Failed to download CSV:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedType]);

  return (
    <ContextCartoon.Provider
      value={{ cartoons, showCartoons, setShowCartoons, currentPage, setCurrentPage, handleTypeChange }}
    >
      <section className="text-center">
        {error ? (
          <>
            <p className="text-3xl font-bold text-red-600 my-6">
              Backend not responding...
            </p>
            <p>Run backend ด้วยงับ</p>
          </>
        ) : isLoading ? (
          <>
            <h1 className="text-3xl font-bold text-blue-500 my-6 tailwind-icon">
              Loading...
            </h1>
            <p>Please wait, the backend is starting itself automatically.</p>
            <Skeleton />
          </>
        ) : isScraping ? ( // Show scraping status
          <>
            <div className="">
              <div className="loader center mx-auto my-5 text-yellow-300"></div>
              <p className="text-lg font-medium">กำลัง Scraping.☺️</p>
              <p className="text-slate-400">ใช้เวลา ประมาณ 3-5 นาที</p>
            </div>
            <Skeleton />
          </>
        ) : cartoons.length > 0 ? (
          <>
            <div className="">
              <h1 className="text-3xl font-bold text-blue-700 my-6 tailwind-icon">
                😘{res.message}😍
              </h1>

              <div className="flex justify-center gap-4">
                <div className={`flex items-center w-fit  rounded-lg text-white px-3 py-2 ${!(cartoons && cartoons.length >= 1)
                  ? "bg-slate-500"
                  : "bg-green-600 hover:bg-green-500"
                  } `}>
                  <CiExport className="text-2xl mr-2" />
                  <button
                    disabled={!(cartoons && cartoons.length >= 1)}
                    onClick={downloadCSV}
                  >
                    Export CSV
                  </button>
                </div>

                <div className={`flex items-center w-fit  rounded-lg text-white px-3 py-2 ${!(cartoons && cartoons.length >= 1)
                  ? "bg-slate-500"
                  : "bg-gray-800 hover:bg-gray-700"
                  } `}>
                  <FaGithub className="text-2xl mr-2" />
                  <a
                    href="https://github.com/prakan-suma/toc-app"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>
            {/* cartoon display */}
            {cartoons.length > 0 ? (
              <section className="container max-w-5xl my-12 mx-auto">
                <div className="flex gap-4 card">
                  <section className="flex flex-col gap-2">
                    <Search onSearch={handleSearch} />
                    <TypeSelect onTypeChange={handleTypeChange} /> {/* Pass handler to TypeSelect */}
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
                  <p className="text-lg font-medium">กำลัง Scraping.☺️</p>
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
