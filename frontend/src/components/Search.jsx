import { FaSearch } from 'react-icons/fa';

function Search() {
  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border border-none bg-indigo-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Search..."
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-slate-500 " />
      </div>
    </div>
  )
}

export default Search