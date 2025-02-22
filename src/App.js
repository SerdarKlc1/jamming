import React, { useState, useCallback } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import styles from "./css/App.module.css";
import { Spotify } from "./components/SpotifyAPI";
import Login from "./components/Login";
import { PlaylistList } from "./components/PlaylistList";

function App() {
  const [tracks, setTracks] = useState("");
  const [playlistUpdate, setPlaylistUpdate] = useState([]);
  const [titlePlaylist, setTitlePlaylist] = useState("Create Playlist");
  const [isLogin, setIsLogin] = useState(false);



  const handleToken = async () => {
   
    try {
      const accessToken = await Spotify.getAccessToken();
      if (accessToken) {
        Spotify.getAccessToken()
        setIsLogin((prev) => !prev);
        
      }
      
    } catch (error) {
      console.error("Error fetching access token:", error);
    } finally {
      setIsLogin(false)
    }
  };

  const fetchArtistData = useCallback(
    (term) => {
      Spotify.search(term)
        .then((response) => Spotify.responseHandler(response))
        .then(setTracks);
    },
    [setTracks]
  );

  const addMoreResults = () => {
    Spotify.moveNext().then((response) =>
      setTracks((prev) => [...prev, ...response])
    );
    console.log("add more", tracks);
  };
  const handleAdd = (e) => {
    if (!playlistUpdate.some((track) => track.key === e.key)) {
      setPlaylistUpdate((prev) => [...prev, e]);
    } else {
      alert("The song is already added");
    }
    const removeItem = tracks.filter((track) => track.key !== e.key);
    setTracks(removeItem);
  };

  const handleRemove = (e) => {
    const removeItem = playlistUpdate.filter((track) => track.key !== e.key);
    setPlaylistUpdate(removeItem);

    setTracks((prev) => [e, ...prev]);
  };

  const handleTitle = (e) => {
    setTitlePlaylist(e.target.value);
  };

  const savePlayList = useCallback(() => {
    const trackUri = playlistUpdate.map((track) => track.uri);
    Spotify.savePlaylist(titlePlaylist, trackUri).then(() => {
      setTitlePlaylist("Create Playlist");
      setPlaylistUpdate([]);
    });
  }, [playlistUpdate, titlePlaylist]);

  return (
    <>
      <h1>
        Ja<span className={styles.highlight}>mm</span>ing
      </h1>
      <div className={styles.app}>
        {isLogin ? (
          <div className={styles.searchBar}>
            <SearchBar onSearch={fetchArtistData} />
          </div>
        ) : (
          <Login handleLogin={handleToken} isLogin={isLogin} />
        )}
        <div className={styles.content}>
          <div className={styles.results}>
            <SearchResults
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              tracks={tracks}
              playList={playlistUpdate}
              addMoreResults={addMoreResults}
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
          <div className={styles.localPlaylist}>
            <PlaylistList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
