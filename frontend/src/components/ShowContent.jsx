import { useState } from "react";
import Card from "./ui/Card";
import { FaStar } from "react-icons/fa6";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

function ShowContent() {
  const [sortOrder, setSortOrder] = useState(true);

  const dataContent = [
    {
      image: "https://m.media-amazon.com/images/I/81IgJ1cGaWS._AC_UF1000,1000_QL80_.jpg",
      name: "Kaiju No.8",
      rating: 10
    },
    {
      image: "https://assets.brandinside.asia/uploads/2024/01/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI3NjY3NjQ@._V1_FMjpg_UX1000_.jpg",
      name: "Attack on Titan",
      rating: 9.5
    },
    {
      image: "https://s.isanook.com/mv/0/ui/26/131157/Sanook_Chainsaw-Man_Key-Art.jpg",
      name: "Chainsaw Man",
      rating: 9.0
    }
  ];

  // Sort data based on the current sortOrder
  const sortedData = [...dataContent].sort((a, b) =>
    sortOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  // Toggle sort order between ascending and descending
//   const toggleSortOrder = () => {
//     setSortOrder(prevOrder => (prevOrder ? 'desc' : 'asc'));
//   };

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
            <div className="flex justify-between items-center gap-10"><img src={value.image} className="w-20 h-32 object-cover rounded-md" /><p className="text-slate-700 text-lg font-medium">{value.name}</p></div>
            <p className="text-slate-700 text-lg font-bold">{value.rating}</p>
        </Card>
      ))}
    </div>
  );
}

export default ShowContent;
