import React, { useState, useEffect } from 'react';
import "./App.css"

function App() {
  const [message, setMessage] = useState('');
  const [error,setError] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('http://127.0.0.1:8000/')
        console.log(response.ok)
        const result = await response.json();
        setMessage(result)
      } catch (error) {
        setError(true)
        console.log(error)
      }
    }

    fetchData()
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-neutral-900 ">
      <section className='text-center'>
        <div className="flex justify-center items-center my-6">
          <img className='w-32 react-icon' src="https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2020/06/09140550/React-logo.png" alt="react" />
          <h1 className="text-3xl font-bold">+</h1>
          <img className='w-24 mx-6 tailwind-icon' src="https://static-00.iconduck.com/assets.00/tailwind-css-icon-2048x1229-u8dzt4uh.png" alt="react" />
          
        </div>
      {error ?
      <>
      <p className='text-3xl font-bold text-red-400 my-2'>Backend not responding...</p>
      <p>"ไป run backend ด้วยงับ"</p>
      </>
      : 
      <>
      <h1 className="text-3xl font-bold text-cyan-400 my-2 tailwind-icon">{message.message}</h1>
      <p>"response from fastAPI"</p>
      </>
      }
      
      </section>

    </div>
  );
}

export default App;
