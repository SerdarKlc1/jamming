import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import styles from "./css/App.module.css";
import { mockData } from "./db";
import { getStoredAccessToken } from "./components/SpotifyAPI";
function App() {
  const [tracks, setTracks] = useState("");
  const [playlistUpdate, setPlaylistUpdate] = useState([]);
  const [titlePlaylist, setTitlePlaylist] = useState("Playlist");

  useEffect(() => {
    fetchArtistData("Rihanna");
  }, []);

  const fetchArtistData = async (term) => {
    const token = await getStoredAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${term}&type=artist,track,album`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);

      const searchTracks = data.tracks?.items || [];

      // Update state safely
      setTracks(searchTracks);
    } catch (error) {
      console.error("Error fetching from Spotify:", error);
    }
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
        <SearchBar onSearch={fetchArtistData} />
      </div>
      <div className={styles.content}>
        <div className={styles.results}>
          <SearchResults
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            tracks={tracks}
            mockData={mockData}
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
