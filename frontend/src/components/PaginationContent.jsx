import React, { useState } from "react";
import PropTypes from "prop-types";

const PaginationContent = ({data}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [recordPage, setRecordPage] = useState(5);

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

  const handleRecordChange = (event) => {
    setRecordPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  }

  return (
    <div className="flex justify-between mt-2 px-2 items-center gap-4">
      <ul className="text-black">
        {currentData.map((record, index) => (
            <li className="text-black" key={index}>{record}</li>
        ))}
      </ul>
      <div>
        <select className="bg-[#cac4d0] rounded-md p-1" onChange={handleRecordChange} value={recordPage}>
          <option value={5} selected>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div>
        <button className="text-white bg-[#d2caff] px-2 p-1 rounded-md hover:bg-[#cac4d0] focus:ring-1 focus:ring-slate-400" onClick={handlePrevious} disabled={currentPage === 0}>
          <p className="font-semibold">Previous</p>
        </button>
          <span className="text-black font-semibold px-2">
              Page {currentPage + 1} of {totalPage}
          </span>
        <button className="text-white bg-[#d2caff] px-2 p-1 rounded-md hover:bg-[#cac4d0] focus:ring-1 focus:ring-slate-400" onClick={handleNext} disabled={currentPage === totalPage - 1}>
          <p className="font-semibold">Next</p>
        </button>
      </div>
    </div>
  );
};

PaginationContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PaginationContent;
