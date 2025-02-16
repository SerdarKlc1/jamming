import React from "react";
import styles from "../css/Login.module.css"
export default function Login ({handleLogin}) {


    return (<>
    <button className={styles.loginButton} onClick={handleLogin}>Login with Spotify</button>
    </>)
}