import { useContext } from "react"
import { ContextCartoon } from "../App"

function ResultCartoon() {
  const {cartoons} = useContext(ContextCartoon)
  return (
    <div className="flex justify-between w-full">
        <h1 className="text-slate-700 text-lg font-medium">Result</h1>
        <h2 className="text-slate-700 text-lg font-medium">{cartoons.length}</h2>
    </div>
  )
}

export default ResultCartoon