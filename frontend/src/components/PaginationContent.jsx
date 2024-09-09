import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ContextCartoon } from "../App";
import ShowContent from "./ShowContent";

const PaginationContent = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [recordPage, setRecordPage] = useState(5);
  const {cartoons, setShowCartoons} = useContext(ContextCartoon)
  const totalPage = Math.ceil(data.length / recordPage);

  // useEffect(() => {
  //   const currentData = cartoons.slice(currentPage * recordPage, (currentPage + 1) * recordPage);
  //   setShowCartoons(currentData)
  // }, [])
  useEffect(() => {
    const currentData = cartoons.slice(currentPage * recordPage, (currentPage + 1) * recordPage);
    setShowCartoons(currentData)
  }, [currentPage, recordPage])
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
  };

  return (
    <div className="flex flex-col justify-between mt-2 items-center gap-4">
      <ShowContent />
      <div className="flex items-center gap-5">
        <select className="bg-slate-100 rounded-md p-1" onChange={handleRecordChange} value={recordPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      rate: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PaginationContent;
