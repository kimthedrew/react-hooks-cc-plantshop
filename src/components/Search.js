import React, { useState, useEffect } from "react";

function Search({onSearch}) {
  const [term, setTerm]=useState("");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(term);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [term, onSearch]);

  function handleSearch(e){
    setTerm(e.target.value);
  
  }
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={term}
        onChange={handleSearch}
      />
      {term && (
        <button onClick={() => { setTerm("");}}>
          clear
        </button>
      )}
    </div>
  );
}


export default Search;