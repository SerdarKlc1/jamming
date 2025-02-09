import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
//import Playlist from "./components/Playlist";
import styles from "./css/App.module.css";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
    },
    {
      id: 2,
      name: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
    },
    { id: 3, name: "Peaches", artist: "Justin Bieber", album: "Justice" },
  ]);
  const handleSearch = (term) => {
    console.log("Searching for:", term);

    // Filtering search results based on the term
    const filteredResults = searchResults.filter((track) => 
      track.name.toLowerCase().includes(term.toLowerCase()) ||
      track.artist.toLowerCase().includes(term.toLowerCase()) ||
      track.album.toLowerCase().includes(term.toLowerCase())
    );

    // Update the state with filtered results
    setSearchResults(filteredResults);
  };

  return (
    <div className={styles.app}>
      <div className={styles.searchBar}>
      <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.content}>
        <div className={styles.results}>
          <SearchResults
            searchResults={searchResults}
          />
        </div>
        <div className={styles.playlist}>
          <h2>Playlist</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
