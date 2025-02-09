import React from "react";
import Track from "./Track";
import styles from "../css/Tracklist.module.css"; // Create this CSS module

function Tracklist({ tracks }) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default Tracklist;
