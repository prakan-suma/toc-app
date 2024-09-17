import { useContext } from "react";
import { ContextCartoon } from "../App";

function ResultCartoon() {
  const { showCartoons } = useContext(ContextCartoon);
  return (
    <div className="flex justify-between w-full p-4 border rounded-lg border-indigo-300 ">
      <h1 className="text-slate-500 font-medium">Result</h1>
      <h2 className="text-indigo-700 text-lg font-semibold">{showCartoons.length}</h2>
    </div>
  );
}

export default ResultCartoon;
