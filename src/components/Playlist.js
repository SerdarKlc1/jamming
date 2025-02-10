import React from "react";
import List from "./List";
import styles from "../css/PlayList.module.css";

export default function Playlist({
  playList,
  handleRemove,
  setTitle,
  onSave,
  titlePlaylist,
}) {
  return (
    <div>
      <h2>
        <input
          className={styles.titleInput}
          value={titlePlaylist}
          type="text"
          onChange={setTitle}
        />
      </h2>
      <div>
        {playList.map((list) => (
          <List key={list.id} list={list} handleRemove={handleRemove} />
        ))}
        <div className={styles.buttonSaveWrapper}>
          {playList.length > 0 && (
            <button className={styles.buttonSave} onClick={onSave}>
              SAVE TO SPOTIFY
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
