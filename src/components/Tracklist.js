import React from "react";
import Track from "./Track";
import styles from "../css/Tracklist.module.css";

function Tracklist({ tracks, handleAdd, playList }) {
  return (
    <div className={styles.tracklist}>
      {tracks?
      tracks.map((track) => (
            <Track
              handleAdd={handleAdd}
              key={track.id}
              track={track}
              album={track.album || "Unkown Album"}
              artist={track.artist|| "Unknown Artist"}
              playList={playList}
            />
          ))
       : "" }
    </div>
  );
}

export default Tracklist;
