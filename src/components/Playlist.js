import React from "react";
import List from "./List";
import PlayListTitle from "./PlayListTitle";

export default function Playlist({ playList, handleRemove }) {
  return (
    <div>
      <h2>
        <PlayListTitle />
      </h2>
      <div>
        {playList.map((list) => (
          <List key={list.id} list={list} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}
