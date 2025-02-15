import React from "react";
import styles from "../css/List.module.css";
function List({ list, handleRemove }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.track}>
          <h3>{list.name}</h3>
          <p>
            {list.album ||  "Unkown Album"} - {list.artist || "Unknown Artist"}
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => handleRemove(list)}>-</button>
        </div>
      </div>
    </>
  );
}

export default List;
