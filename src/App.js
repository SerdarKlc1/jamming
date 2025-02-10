import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import styles from "./css/App.module.css";
import { mockData } from "./db";
import { getAccessToken, getStoredAccessToken, fetchArtistData } from "./components/SpotifyAPI"
function App() {
  const [searchResults, setSearchResults] = useState(mockData);
  const [playlistUpdate, setPlaylistUpdate] = useState([]);
  const [titlePlaylist, setTitlePlaylist] = useState("Playlist");
 
  
  const handleSearch =  (term) => {
    
    const filteredResults = searchResults.filter(
      (track) =>
        track.name.toLowerCase().includes(term.toLowerCase()) ||
        track.artist.toLowerCase().includes(term.toLowerCase()) ||
        track.album.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredResults);
  }

    

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

  const handleTitle = (e) => {
    setTitlePlaylist(e.target.value);
  };

  const savePlayList = () => {
    const trackUri = playlistUpdate.map((track) => track.uri);
    console.log(trackUri);
    setPlaylistUpdate([]);
    setTitlePlaylist("New Playlist");
  };
  return (
    <div className={styles.app}>
      <div className={styles.searchBar}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.content}>
        <div className={styles.results}>
          <SearchResults
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            searchResults={searchResults}
          />
        </div>
        <div className={styles.playlist}>
          <Playlist
            setTitle={handleTitle}
            onSave={savePlayList}
            titlePlaylist={titlePlaylist}
            playList={playlistUpdate}
            handleRemove={handleRemove}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
