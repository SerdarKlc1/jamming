import React, { useState } from "react";
import { userName, Spotify } from "./SpotifyAPI";
import PlaylistListItem from "./PlaylistListItem";
import styles from "../css/PlaylistList.css";

export default function PlaylistList() {
  const [clicked, setClicked] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);

  const handleUserPlayList = async () => {
    try {
      const response = await Spotify.getUserPlaylists();
      const result = response?.items || [];
      setUserPlaylists(result);
      setClicked((prev) => !prev);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return (
    <div className={styles.playlistList}>
      <h3>{userName || Spotify.getCurrentUserId()}</h3>
      <p onClick={handleUserPlayList} className={styles.playlistTitle} style={{ cursor: "pointer" }}>
        Local Playlist
      </p>
      <PlaylistListItem clicked={clicked} userPlaylists={userPlaylists} />
    </div>
  );
}
