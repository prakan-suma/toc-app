import PropTypes from "prop-types";
import Card from "./ui/Card";
import { FaStar } from "react-icons/fa6";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { useState } from "react";

function ShowContent({ data }) {
  const [sortOrder, setSortOrder] = useState(true);

  const sortedData = [...data].sort((a, b) =>
    sortOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  return (
    <div className="w-[720px]">
      <Card className="flex items-center justify-between bg-indigo-100">
        <h1 className="text-slate-700 text-xl font-bold">Name</h1>
        <div className="flex items-center">
          <span className="text-yellow-400 text-xl mr-2"><FaStar /></span>
          <button onClick={() => setSortOrder(!sortOrder)} className="text-slate-700 text-xl">
            {sortOrder ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />}
          </button>
        </div>
      </Card>

      {sortedData.map((value, index) => (
        <Card key={index} className={`mt-2 flex justify-between items-center ${index % 2 === 0 ? 'bg-indigo-50' : 'bg-indigo-100'}`}>
          <div className="flex justify-between items-center gap-10">
            <img src={value.image_url} className="w-20 h-32 object-cover rounded-md" />
            <p className="text-slate-700 text-lg font-medium">{value.name}</p>
          </div>
          <p className="text-slate-700 text-lg font-bold">{value.rate}</p>
        </Card>
      ))}
    </div>
  );
}

ShowContent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ShowContent;
