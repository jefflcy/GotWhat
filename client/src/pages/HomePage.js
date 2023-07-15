import SearchBar from "../components/SearchBar";
import SideMenu from "../components/SideMenu";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSearch = async (query) => {
    try {
      const { data } = await axios.get(`${backendUrl}/search?query=${query}`);
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#365b6d] h-screen">
      <SideMenu />
      <div className="p-20">
        <h1 className="text-center mx-auto pt-20 text-5xl font-bold py-8 text-white">
          GotWhat
        </h1>
        <SearchBar onSearch={handleSearch} />

        <div>
          {searchResults.map((result) => (
            <Link
              to={`/restaurant/${result._id}`}
              className=" flex flex-wrap mx-auto border border-transparent rounded p-3 w-[600px] max-h-[300px] text-black bg-white overflow-y-scroll"
              key={result._id}
            >
              {result.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
