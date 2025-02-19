import styles from "../css/PlaylistList.css";

export default function PlaylistListItem({ userPlaylists, clicked }) {
  return (
    <ul className={styles.playlistItems}>
      {clicked && userPlaylists.length > 0
        ? userPlaylists.map((element, i) => (
            <li key={element.id + i} className={styles.playlistItem}>
              {element?.name}
            </li>
          ))
        : clicked && <li className={styles.noPlaylist}>No playlists found</li>}
    </ul>
  );
}
