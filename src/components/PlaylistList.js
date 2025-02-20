import React, { useState } from "react";
import { userName, Spotify, response } from "./SpotifyAPI";
import styles from "../css/PlaylistList.module.css";
import PlaylistItem from "./PlayListItem";
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
  const handleDelete = (e) => {
    Spotify.deletePlaylist(e).then((response)=>{
      if(response){
        setUserPlaylists(userPlaylists.filter((element)=>{
          return element.id !== e;
         }))
      }
    })
    console.log('handleDelete', e)
  };

  return (
    <div className={styles.playlistList}>
      {/* <h3>{userName || Spotify.getCurrentUserId()}</h3> */}
      <h3
        onClick={handleUserPlayList}
        className={styles.playlistTitle}
      >
        Local Playlist
      </h3>
      <PlaylistItem handleDelete={handleDelete} clicked={clicked} userPlaylists={userPlaylists} />
    </div>
  );
}
