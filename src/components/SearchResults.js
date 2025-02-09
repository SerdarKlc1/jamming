import React from "react";
import Tracklist from "./Tracklist";
import styles from "../css/SearchResults.module.css"; 

function SearchResults({ searchResults }) {
  return (
    <div className={styles.searchResults}>
      <h2>Results</h2>
      <Tracklist tracks={searchResults} />
    </div>
  );
}

export default SearchResults;
