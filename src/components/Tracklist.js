import React from "react";
import Track from "./Track";
import styles from "../css/Tracklist.module.css";

function Tracklist({ tracks, handleAdd, playList, handleRemove, addMoreResults }) {
  return (
    <div className={styles.tracklist}>
      {tracks?
      tracks.map((track) => (
            <Track
              handleAdd={handleAdd}
              key={track.key}
              track={track}
              album={track.album || "Unkown Album"}
              artist={track.artist|| "Unknown Artist"}
              playList={playList}
              handleRemove={handleRemove}
            />
          ))
       : "" }
           <div className={styles.buttonSaveWrapper}>
          {tracks.length > 0 && (
            <button className={styles.buttonSave} onClick={addMoreResults}>
              MORE RESULTS
            </button>
          )}
        </div>
    </div>
  );
}

export default Tracklist;
