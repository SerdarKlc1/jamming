import styles from "../css/PlaylistList.module.css";


export default function PlaylistItem({ userPlaylists, clicked, handleDelete }) {
  const clickedHandle = (e) =>{
    console.log("i am clicked", e)
  }
  return (
    <ul className={styles.playlistItems}>
      {clicked && userPlaylists.length > 0
        ? userPlaylists.map((element) => (
            <li key={element.id} className={styles.playlistItem} >
              {element?.name}
              <button className={styles.buttonWrapper} onClick={()=>handleDelete(element.id)}>-</button>
            </li>
            
          ))
        : clicked && <li className={styles.noPlaylist}>No playlists found</li>}
    </ul>
  );
}
