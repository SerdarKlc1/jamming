import styles from "../css/PlaylistList.module.css";

export default function PlaylistItem({
  userPlaylists,
  clicked,
  handleDelete,
  selectedPlaylistId,
  selectedPlaylistTracks,
  handlePlaylistClick,
}) {
  return (
    <ul className={styles.playlistItems}>
      {clicked && userPlaylists.length > 0 ? (
        userPlaylists.map((element) => (
          <li key={element.id} className={styles.playlistItem}>
           
            <div onClick={() => handlePlaylistClick(element.id)}>
              {element?.name}
            </div>
            {selectedPlaylistId === element.id && (
              <ul className={styles.trackList}>
                {selectedPlaylistTracks.length > 0 ? (
                  selectedPlaylistTracks.map((track) => (
                    <li key={track.track?.id} className={styles.trackItem}>
                      {track.track?.name} - {track.track?.artists?.[0].name}
                    </li>
                  ))
                ) : (
                  <li className={styles.noTracks}>No tracks found</li>
                )}
              </ul>
            )}
            <button
              className={styles.buttonWrapper}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(element.id);
              }}
            >
              -
            </button>
     
          </li>
        ))
      ) : (
        clicked && <li className={styles.noPlaylist}>No playlists found</li>
      )}
    </ul>
  );
}