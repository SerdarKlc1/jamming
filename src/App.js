import React, { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import styles from "./css/App.module.css";
import { Spotify } from "./components/SpotifyAPI";
import Login from "./components/Login";

function App() {
  const [tracks, setTracks] = useState("");
  const [playlistUpdate, setPlaylistUpdate] = useState([]);
  const [titlePlaylist, setTitlePlaylist] = useState("Playlist");
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = useCallback(() => {
    Spotify.getAccessToken();
    setIsLogin((prev)=>!prev);
  }, [setIsLogin]);

  // useEffect(() => {
  //   Spotify.getAccessToken();
  // }, []);
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
      setTitlePlaylist("Playlist");
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
          <div className="welcome-container">
            <h2 id={styles.header}>🎵 Welcome to Jamming!</h2>
            <p>Create and save your playlists directly to Spotify.</p>
            <Login handleLogin={handleLogin}  />
          </div>
        )}
        <div className={tracks ? styles.content : styles.initialContent}>
          <div className={tracks ? styles.results : styles.intialResults}>
            <SearchResults
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              tracks={tracks}
              playList={playlistUpdate}
              addMoreResults={addMoreResults}
            />
          </div>
          <div className={tracks ? styles.playlist : styles.initialPlaylist}>
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
