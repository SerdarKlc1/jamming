import React, { useState } from "react";
import { userName, Spotify, response } from "./SpotifyAPI";
import styles from "../css/PlaylistList.module.css";
import PlaylistItem from "./PlayListItem";

function PlaylistList() {
  const [clicked, setClicked] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);


const handlePlaylistClick = async (playlistId) => {
  console.log(`Playlist clicked: ${playlistId}`);
  if (selectedPlaylistId === playlistId) {
    setSelectedPlaylistId(null);
    setSelectedPlaylistTracks([]);
    return;
  } 
  setSelectedPlaylistId(playlistId);
  const tracks = await Spotify.getPlaylistTracks(playlistId);

  setSelectedPlaylistTracks(tracks); 
};


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
      handleUserPlayList();
      setClicked((prev) => !prev);
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
      <PlaylistItem selectedPlaylistId={selectedPlaylistId} handlePlaylistClick={handlePlaylistClick} selectedPlaylistTracks={selectedPlaylistTracks} handleDelete={handleDelete} clicked={clicked} userPlaylists={userPlaylists} />
    </div>
  );
}

export { PlaylistList}
