import React, {useState} from "react";

const handleSearch = async (term) => {
const [term, setTerm] = useState("");
    
if (!term) return;
    const token = getAccessToken()
    
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.tracks) {
      const formattedResults = data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
  
      setSearchResults(formattedResults);
    }
  };


