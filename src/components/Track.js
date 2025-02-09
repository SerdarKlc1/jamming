import React from "react";
import styles from "../css/Track.module.css";

function Track({ track }) {
  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <button>+</button>
      </div>
    </div>
  );
}

export default Track;
