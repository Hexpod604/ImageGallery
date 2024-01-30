import { useState } from "react";

export default function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="container mx-auto">
      <div className="mx-auto flex flex-col items-center justify-center py-20 sm:py-32">
        <h1 className="mb-4 text-2xl font-bold text-center tracking-tight leading-none sm:text-3xl md:text-4xl lg:text-5xl text-white">
          Infinite scroll image gallery
        </h1>
        <p className="mb-8 text-md font-normal text-center sm:text-lg lg:text-xl sm:px-16 xl:px-48 text-gray-400">
          Development by{" "}
          <a
            className="text-indigo-300 font-semibold"
            href="https://lautaro-spiazzi.netlify.app"
          >
            Lautaro Spiazzi
          </a>
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <form onSubmit={handleSearchSubmit} className="flex">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium sr-only text-white"
            >
              Search
            </label>

            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="block py-2.5 px-8 w-full z-20 placeholder-gray-600 text-sm text-gray-900 rounded-e-lg rounded-lg border border-gray-300 focus:outline-none bg-gray-200"
                placeholder="Search an image..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-indigo-300 rounded-e-lg border border-indigo-400 hover:bg-indigo-400 focus:ring-4 focus:outline-none focus:ring-indigo-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
