import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-center mt-8 px-4"
    >
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Search clothes, styles, or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-3 pl-12 text-black border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <SearchIcon
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </form>
  );
};

export default SearchBar;
