import { useState } from "react";

function TypeSelect() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const dataType = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-fi", "Thriller"];
    
    const onTypeChange = (e) => {
        const value = e.target.value;
        setSelectedTypes(prev => 
            prev.includes(value) 
                ? prev.filter(item => item !== value) 
                : [...prev, value]
        );
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5 w-full px-14 py-5 bg-indigo-100 rounded-lg">
            <h1 className="text-slate-700 text-xl font-bold">Type</h1>
            <ul className="flex flex-col justify-center items-start gap-2">
                {dataType.map((value, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <input
                            id={value}
                            name="type"
                            value={value}
                            type="checkbox"
                            onChange={onTypeChange}
                            checked={selectedTypes.includes(value)}
                            className="h-4 w-4 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={value} className="text-slate-700 font-normal">{value}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TypeSelect;
