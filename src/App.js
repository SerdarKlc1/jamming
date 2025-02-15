import React, {useState, useCallback, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import styles from "./css/App.module.css";
import Spotify from "./components/SpotifyAPI";

function App() {
  const [tracks, setTracks] = useState("");
  const [playlistUpdate, setPlaylistUpdate] = useState([]);
  const [titlePlaylist, setTitlePlaylist] = useState("Playlist");
  
  useEffect(()=>{
    Spotify.getAccessToken()
  },[])

  const fetchArtistData = useCallback((term)=>{
    Spotify.search(term).then(setTracks);
  },[setTracks]);

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

  const savePlayList = useCallback(()=>{
    const trackUri = playlistUpdate.map((track) => track.uri);
    Spotify.savePlaylist(titlePlaylist, trackUri).then(()=>{
      setTitlePlaylist('Playlist');
      setPlaylistUpdate([])
    })
  },[playlistUpdate, titlePlaylist]);
 
  return (
    <>
     <h1>
        Ja<span className={styles.highlight}>mm</span>ing
      </h1>
    <div className={styles.app}>
      <div className={styles.searchBar}>
        <SearchBar onSearch={fetchArtistData} />
      </div>
      <div className={tracks ? styles.content:styles.initialContent}>
        <div className={styles.results}>
          <SearchResults
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            tracks={tracks}
            playList={playlistUpdate}
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
    </>
  );
}

export default App;
