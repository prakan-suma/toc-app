import { useContext, useState, useEffect } from "react";
import { ContextCartoon } from "../App";

function TypeSelect() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { cartoons, setShowCartoons, setCurrentPage } = useContext(ContextCartoon);
  const dataType = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-fi", "Thriller"];

  const onTypeChange = (e) => {
    const value = e.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    if (selectedTypes.length > 0) {
      const filteredCartoons = cartoons.filter((cartoon) =>
        selectedTypes.includes(cartoon.category)
      );
      setShowCartoons(filteredCartoons);
    } else {
      setShowCartoons(cartoons);
    }

    setCurrentPage(0);
  }, [selectedTypes, cartoons, setShowCartoons, setCurrentPage]);

  return (
    <>
      <div className="flex justify-center p-4 bg-indigo-100 rounded-lg ">

        <div className="flex flex-col items-start gap-4">
          {dataType.map((value, index) => (
            <>
              <label key={index} className="font-semibold text-slate-600">
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedTypes.includes(value)}
                  onChange={onTypeChange}
                  className=" mr-2"
                />
                {value}
              </label>
            </>

          ))
          }
        </div>
      </div >
    </>
  );
}

export default TypeSelect;
