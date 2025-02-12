import React, { useState } from "react";
import styles from "../css/SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  

  const submitTerm = (e) => {
    e.preventDefault();

      console.log(term)
      onSearch(term);
    
  };
  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <form onClick={submitTerm} className={styles.searchBar}>
      <input
        className={styles.searchBarInput}
        type="text"
        placeholder="Enter a song, album, or artist"
        value={term}
        onChange={handleTermChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}


export default SearchBar;
