import React, { useState, useCallback } from "react";
import styles from "../css/Track.module.css";

function Track({
  track = { name: "Blinding Lights" },
  handleAdd,
  album = "album",
  artist = "artist",
  playList,
  handleRemove,
}) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const renderAction = useCallback(() => {
    if (playList.some((list) => list.id === track.id)) {
      return (
        <button key={track.id} onClick={() => handleRemove(track)}>
          -
        </button>
      );
    } else {
      return (
        <button key={track.id} onClick={() => handleAdd(track)}>
          +
        </button>
      );
    }
  }, [handleAdd, playList, track, handleRemove]);

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <h3>{track.name}</h3>
        <p>
          {album} - {artist}
        </p>

        <button onClick={openPopup}>Play Preview</button>

        {isPopupOpen && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <button onClick={closePopup} className={styles.closeButton}>
                X
              </button>
              <iframe
                src={`https://open.spotify.com/embed/track/${track.id}`}
                width="300"
                height="80"
                allow="encrypted-media"
                title="Spotify Song Preview"
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <div className={styles.buttonWrapper}>{renderAction()}</div>
    </div>
  );
}

export default Track;
