import React, { useCallback } from "react";
import styles from "../css/Track.module.css";

function Track({
  track = { name: "Blinding Lights" },
  handleAdd,
  album = "album",
  artist = "artist",
  playList,
  handleRemove

}) {
 const renderAction = useCallback(()=>{
  if(playList.some(list=>list.id===track.id)){
    return (<button key ={track.id} onClick={() => handleRemove(track)} >-</button>)
  } else {
    return (<button key ={track.id} onClick={() => handleAdd(track)} >+</button>)
  }
 },[handleAdd, playList, track, handleRemove])

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <h3>{track.name}</h3>
        <p>
          {album} - {artist}
        </p>
      </div>
      <div className={styles.buttonWrapper}>
      {renderAction()}
      </div>
    </div>
  );
}

export default Track;
