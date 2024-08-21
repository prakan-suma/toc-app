import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [res, setRes] = useState("");
  const [cartoons, setCartoons] = useState([]);
  const [error, setError] = useState(false);

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
        const cachedData = localStorage.getItem("cartoons"); // เปลี่ยนเป็น 'cartoons'
        if (cachedData) {
          setCartoons(JSON.parse(cachedData)); // เปลี่ยนเป็น JSON.parse
        } else {
          const response = await fetch(
            "https://toc-app-be.onrender.com/scrape"
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setCartoons(result);
          localStorage.setItem("cartoons", JSON.stringify(result)); // เปลี่ยนเป็น 'cartoons'
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchCartoons();
  }, []);

  return (
    <div className="min-h-screen  flex items-center justify-center bg-neutral-900 ">
      <section className="text-center">
        <div className="flex justify-center items-center my-6">
          <img
            className="w-32 react-icon"
            src="https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2020/06/09140550/React-logo.png"
            alt="react"
          />
          <h1 className="text-3xl font-bold">+</h1>
          <img
            className="w-24 mx-6 tailwind-icon"
            src="https://img.icons8.com/fluent/200/tailwind_css.png"
            alt="react"
          />
        </div>
        <h1 className="text-lg my-">Power by React & Tailwind</h1>

        {error ? (
          <>
            <p className="text-3xl font-bold text-red-500 my-6">
              Backend not responding...
            </p>
            <p>" Run backend ด้วยงับ （〃｀ 3′〃）"</p>
          </>
        ) : res ? (
          <>
            <h1 className="text-3xl font-bold text-cyan-400 my-6 tailwind-icon">
              {res.message}
            </h1>
            <p>"Response form Backend fastAPI╰(*°▽°*)╯"</p>

            {/* cartoon display  */}
            {cartoons && cartoons.length >= 1 && (
              <section className="w-1/2 my-12 mx-auto">
                <div className="grid grid-cols-4 gap-4 card">
                  {cartoons.map((cartoon, index) => (
                    <div
                      key={index} // เพิ่ม key
                      className="flex flex-col backdrop-blur-md bg-white/10 rounded-md"
                    >
                      <img
                        className="w-full h-72  object-cover rounded-md "
                        src={cartoon.image_url}
                        alt=""
                      />
                      <h3 className="text-xl py-3">{cartoon.name}</h3>
                      <div className="bottom mt-auto">
                        <p className="text-yellow-300">⭐{cartoon.rate}</p>
                        <p className="py-3">
                          <span className="bg-sky-600 px-2 rounded-full">
                            {cartoon.category}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-cyan-400 my-6 tailwind-icon">
              Loading...
            </h1>
            <p>Please wait, the backend is starting itself automatically.</p>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
