import React from "react";
import Track from "./Track";
import styles from "../css/Tracklist.module.css";


function Tracklist({
 
  tracks,
  handleAdd,
  mockData,
  searchResults,
}) {
  return (
    <div className={styles.tracklist}>
      {tracks ?
      tracks.map((track) => (
            <Track handleAdd={handleAdd} key={track.id} track={track} album={track.album?.name ||  "Unkown Album"} artist={track.artists?.[0]?.name || "Unknown Artist"}/>
          )):
          mockData.map(track=>{
            <Track handleAdd={handleAdd} key={track.id} track={track} />

          })
          }
    </div>
  );
}

export default Tracklist;
