import React, { useState } from "react";
import styles from "../css/SearchBar.module.css"; 

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  
  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  
  const handleSearch = () => {
    onSearch(term);
  };

  return (
    <div className={styles.searchBar}>
      <input className={styles.searchBarInput}
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
