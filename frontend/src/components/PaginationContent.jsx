import React, { useState } from "react";

const PaginationContent = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const data = [
    "Record 1", "Record 2", "Record 3", "Record 4", "Record 5",
    "Record 6", "Record 7", "Record 8", "Record 9", "Record 10",
    "Record 11", "Record 12", "Record 13", "Record 14"
  ];

  const recordPage = 5;

  const totalPage = Math.ceil(data.length / recordPage);

  const currentData = data.slice(currentPage * recordPage, (currentPage + 1) * recordPage);
  const handleNext = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-end items-center gap-4">
      {/* <ul className="text-black">
        {currentData.map((record, index) => (
            <li className="text-black" key={index}>{record}</li>
        ))}
      </ul> */}
      <button className="text-white bg-[#d2caff] px-2 rounded-md hover:bg-[#cac4d0] focus:ring-1 focus:ring-slate-400" onClick={handlePrevious} disabled={currentPage === 0}>
        <p className="font-semibold">Previous</p>
      </button>
        <span className="text-black font-semibold">
            Page {currentPage + 1} of {totalPage}
        </span>
      <button className="text-white bg-[#d2caff] px-2 rounded-md hover:bg-[#cac4d0] focus:ring-1 focus:ring-slate-400" onClick={handleNext} disabled={currentPage === totalPage - 1}>
        <p className="font-semibold">Next</p>
      </button>
    </div>
  );
};

export default PaginationContent;
