import React from "react";
import Tracklist from "./Tracklist";
import styles from "../css/SearchResults.module.css";

function SearchResults({ albums, artists, tracks, handleAdd, mockData }) {
  return (
    <div className={styles.searchResults}>
      <h2>Results</h2>
      <Tracklist albums={albums} tracks={tracks} artists={artists} handleAdd={handleAdd} mockData={mockData} />
    </div>
  );
}

export default SearchResults;
