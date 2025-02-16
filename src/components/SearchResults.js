import React from "react";
import Tracklist from "./Tracklist";
import styles from "../css/SearchResults.module.css";

function SearchResults({ tracks, handleAdd, playList, handleRemove, addMoreResults}) {
  return (
    <div className={styles.searchResults}>
      <h2>Results</h2>
      <Tracklist  addMoreResults={addMoreResults} tracks={tracks} playList={playList} handleRemove={handleRemove} handleAdd={handleAdd} />
    </div>
  );
}

export default SearchResults;
