import React from "react";
import Track from "./Track";
import styles from "../css/Tracklist.module.css";

function Tracklist({ tracks, handleAdd }) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((track) => (
        <Track handleAdd={handleAdd} key={track.id} track={track} />
      ))}
    </div>
  );
}

export default Tracklist;
