import React from "react";
import Tracklist from "./Tracklist";
import styles from "../css/SearchResults.module.css";

function SearchResults({ searchResults, handleAdd }) {
  return (
    <div className={styles.searchResults}>
      <h2>Results</h2>
      <Tracklist tracks={searchResults} handleAdd={handleAdd} />
    </div>
  );
}

export default SearchResults;
