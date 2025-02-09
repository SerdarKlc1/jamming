import React, { useState } from "react";
import styles from "../css/SearchBar.module.css"; // Import CSS module

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  // Handle input change
  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    onSearch(term);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Enter a song, album, or artist"
        value={term}
        onChange={handleTermChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
