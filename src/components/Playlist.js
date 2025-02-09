import React from "react";
import List from "./List";

export default function Playlist({ playList, handleRemove }) {
    
  return (
    <div>
      <h2>Playlist</h2>
      <div>
        {playList.map((list) => (
          <List key={list.id} list={list} handleRemove={handleRemove}/>
        ))}
      </div>
    </div>
  );
}
