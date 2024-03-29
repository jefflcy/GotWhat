import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleClick = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleClick}>
        <div className="flex flex-wrap max-w-[600px] mx-auto text-white border rounded">
          <input
            type="search"
            value={searchQuery}
            onChange={handleInputChange}
            className="p-3 flex w-[530px] text-black border-transparent"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
          />
          <button
            type="submit"
            className=" flex bg-white items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="black"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
