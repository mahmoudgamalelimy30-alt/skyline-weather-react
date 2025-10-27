import { useState } from "react";
import searchIcon from "/search.png";

const SearchBox = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form className="flex justify-center" onSubmit={handleSubmit}>
      <div className="flex items-center border-2 border-blue-400 rounded-full  shadow-xl bg-white/20 backdrop-blur-md ">
        <button
          type="submit"
          className="px-4 py-2 flex items-center justify-center"
        >
          <img
            src={searchIcon}
            alt="search"
            width="20px"
            height="20px"
            className="hover:invert transition-all duration-300"
          />
        </button>
        <input
          type="text"
          placeholder="Enter City Name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 w-64 outline-none text-gray-800 bg-transparent placeholder-gray-600 hover:w-72 transition-all duration-300 ease-in-out focus:w-72"
        />
      </div>
    </form>
  );
};

export default SearchBox;
