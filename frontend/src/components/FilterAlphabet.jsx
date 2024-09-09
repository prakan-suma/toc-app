import { useContext } from "react"; 
import { ContextCartoon } from "../App";
function FilterAlphabet() {
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
    const {setShowCartoons, cartoons} = useContext(ContextCartoon)


    function SetAlphabetCartoons(alphabetSelect) {
        setShowCartoons(alphabetSelect
    ? cartoons.filter((item) => new RegExp(`^${alphabetSelect}`, "i").test(item.name))
    : cartoons);
    }
    return (
        <div className="flex justify-between items-center rounded-lg bg-indigo-100 w-[720px] p-2 gap-2">
            {
                alphabet.map((value, index) => {
                    return <button key={index} onClick={() => SetAlphabetCartoons(value)} className="font-bold text-slate-500">{value.toUpperCase()}</button>
                })
            }
        </div>
  )
}
export default FilterAlphabet