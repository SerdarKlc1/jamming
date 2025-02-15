import React from "react";
import Tracklist from "./Tracklist";
import styles from "../css/SearchResults.module.css";

function SearchResults({ tracks, handleAdd, playList }) {
  return (
    <div className={styles.searchResults}>
      <h2>Results</h2>
      <Tracklist tracks={tracks} playList={playList}  handleAdd={handleAdd} />
    </div>
  );
}

export default SearchResults;
