import Search from "./components/Search";
import TypeSelect from "./components/TypeSelect";
import ResultCartoon from "./components/ResultCartoon";
import FilterAlphabet from "./components/FilterAlphabet";
import PaginationContent from "./components/PaginationContent";
<<<<<<< HEAD
import { createContext, useEffect, useState } from "react";

export const ContextCartoon = createContext();
=======
import Skeleton from "./components/Skeleton";
>>>>>>> 5c04777ae55873765182f7c9d0b6ae2f4735d4d0

function App() {
  const [res, setRes] = useState("");
  const [cartoons, setCartoons] = useState([]);
  const [showCartoons, setShowCartoons] = useState([]);
  const [error, setError] = useState(false);

  const CACHE_TIME = 1000 * 60 * 60; 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://toc-app-be.onrender.com");
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
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setCartoons(result);
          setShowCartoons(result);
          localStorage.setItem("cartoons", JSON.stringify(result));
          localStorage.setItem("cartoonsTimestamp", Date.now()); 
        }
      } catch (error) {
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

  const downloadCSV = async () => {
    try {
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
    } catch (error) {
      console.error("Failed to download CSV:", error);
    }
  };

  return (
    <ContextCartoon.Provider
      value={{ cartoons, showCartoons, setShowCartoons }}
    >
<<<<<<< HEAD
      <section className="text-center ">
=======
      <section className="py-24 mx-auto  text-center">
>>>>>>> 5c04777ae55873765182f7c9d0b6ae2f4735d4d0
        {error ? (
          <>
            <p className="text-3xl font-bold text-red-600 my-6">
              Backend not responding...
            </p>
            <p>"Backend was not response 😭"</p>
          </>
        ) : res ? (
          <>
            <div>
<<<<<<< HEAD
              <h1 className="text-3xl font-bold text-cyan-400 my-6 tailwind-icon">
=======

              <h1 className="text-3xl font-bold text-blue-700   tailwind-icon">
>>>>>>> 5c04777ae55873765182f7c9d0b6ae2f4735d4d0
                {res.message}
              </h1>
              <button
                disabled={!(cartoons && cartoons.length >= 1)}
                onClick={downloadCSV}
<<<<<<< HEAD
                className={`my-6 rounded-full px-3 ${
                  !(cartoons && cartoons.length >= 1)
                    ? "bg-slate-500"
                    : "bg-green-600 hover:bg-green-500"
                } `}
=======
                className={`text-gray-50 my-6 rounded-full py-2 px-6 ${!(cartoons && cartoons.length >= 1) ? " bg-gray-600" : "bg-green-600 hover:bg-green-500"} `}
>>>>>>> 5c04777ae55873765182f7c9d0b6ae2f4735d4d0
              >
                Export CSV
              </button>
            </div>
<<<<<<< HEAD
            {/* cartoon display */}
=======
            {/* cartoon display  */}
>>>>>>> 5c04777ae55873765182f7c9d0b6ae2f4735d4d0
            {cartoons && cartoons.length >= 1 ? (
              <section className="container max-w-5xl my-6 mx-auto">
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
                  <p className="text-lg text-blue-700 font-medium">กำลัง Scraping</p>
                  <p className="text-gray-900">ใช้เวลา ประมาณ 3-5 นาที</p>
                </div>
                <Skeleton />

              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-blue-700 my-6 tailwind-icon">
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
