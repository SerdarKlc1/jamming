import React, { useState } from "react";
import styles from '../css/PlayListTitle.module.css'
function PlayListTitle() {
  const [titlePlaylist, setTitlePlaylist] = useState("Playlist");

  return (
    
      <input className={styles.titleInput}
        value={titlePlaylist}
        type="text"
        onChange={(e) => setTitlePlaylist(e.target.value)}
      />
    
  );
}

export default PlayListTitle;
