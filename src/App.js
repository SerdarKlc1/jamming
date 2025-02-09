import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import styles from "./css/App.module.css";
import { data } from "./db";
function App() {
  const [searchResults, setSearchResults] = useState(data);
  const [playlistUpdate, setPlaylistUpdate] = useState([]);

  const handleSearch = (term) => {
    const filteredResults = searchResults.filter(
      (track) =>
        track.name.toLowerCase().includes(term.toLowerCase()) ||
        track.artist.toLowerCase().includes(term.toLowerCase()) ||
        track.album.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredResults);
  };
  const handleAdd = (e) => {
    if (!playlistUpdate.some((track) => track.id === e.id)) {
      setPlaylistUpdate((prev) => [...prev, e]);
    } else {
      alert("The song is already added");
    }
  };

  const handleRemove = (e) => {
    const removeItem = playlistUpdate.filter((track) => track.id !== e.id);
    setPlaylistUpdate(removeItem);
  };

  return (
    <div className={styles.app}>
      <div className={styles.searchBar}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.content}>
        <div className={styles.results}>
          <SearchResults handleAdd={handleAdd} searchResults={searchResults} />
        </div>
        <div className={styles.playlist}>
          <Playlist handleRemove={handleRemove} playList={playlistUpdate} />
        </div>
      </div>
    </div>
  );
}

export default App;
