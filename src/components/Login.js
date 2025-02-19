import React from "react";
import styles from "../css/Login.module.css";
export default function Login({ handleLogin, isLogin }) {
  return (
    <div className="welcome-container">
      <h2 id={styles.header}>🎵 Welcome to Jamming!</h2>
      <p>Create and save your playlists directly to Spotify.</p>
      <button className={styles.loginButton} onClick={handleLogin}>
        Login with Spotify
      </button>
    </div>
  );
}
