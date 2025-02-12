import React from "react";
import styles from "../css/Track.module.css";

function Track({track={name:'Blinding Lights'}, handleAdd, album='album', artist='artist' }) {
  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <h3>{track.name}</h3>
        <p>{album} - {artist}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={() => handleAdd(track)}>+</button>
      </div>
    </div>
  );
}

export default Track;
