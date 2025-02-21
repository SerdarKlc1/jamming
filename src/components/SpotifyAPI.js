const clientId = "4075a427427f42c194d4a3686317fbc1"; // Insert client ID here.
// const redirectUri = "https://serdarklc1.github.io/jamming/callback";
const redirectUri='https://jammmingserdar.netlify.app/callback' ;
// const redirectUri = "http://localhost:3000/callback";

let nextPage;
let response;
let moveNextResponse;
let token = null;
let tokenExpiration = null;
let headers;
let userId;
let userName;

const Spotify = {
  getAccessToken() {
    if (token) {
      return token;
    }

    // Check URL for access token
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const expiresIn = hashParams.get("expires_in");

    if (accessToken && expiresIn) {
      token = accessToken;
      tokenExpiration = Date.now() + Number(expiresIn) * 1000;

      // Remove token from URL
      window.history.pushState({}, document.title, "/");

      return token;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(
        redirectUri
      )}`;
      window.location = accessUrl;
    }
  },
  getStoredAccessToken: async () => {
    if (!token || Date.now() > tokenExpiration) {
      return await Spotify.getAccessToken();
    }
    return token;
  },
  search(term) {
    const token = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        nextPage = jsonResponse.tracks.next;
        response = jsonResponse.tracks?.items;

        if (!jsonResponse.tracks) {
          return [];
        }
        return response;
      });
  },
  responseHandler(response) {
    return response.map((track, i) => ({
      src: `https://open.spotify.com/embed/track/${track.id}`,
      id: track.id,
      key: track.id + i,
      name: track.name,
      artist: track.artists?.[0]?.name || "Unknown Artist",
      album: track.album?.name || "Unkown Album",
      uri: track.uri,
    }));
  },
  async getCurrentUserId() {
    if (!userId) {
      const token = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: headers,
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      userName = jsonResponse.display_name;
      userId = jsonResponse.id;
    }
    console.log("userId", userId);

    return userId;
  },
  async getPlaylist(id) {
    token = token || (await Spotify.getAccessToken());
    headers = { Authorization: `Bearer ${token}` };
    userId = userId || (await Spotify.getCurrentUserId());
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`;
    const result = await fetch(endpoint, {
      headers: headers,
    });
    const response = result.json();
    console.log("select playlist", response);
    return response;
  },
  async deletePlaylist(playlistId) {
    const token = await Spotify.getAccessToken();
    const userId = await Spotify.getCurrentUserId();
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(`Playlist ${playlistId} deleted successfully.`);
      } else {
        const errorData = await response.json();
        console.error(`Error deleting playlist:`, errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  },
  async getUserPlaylists() {
    token = await Spotify.getAccessToken();
    headers = { Authorization: `Bearer ${token}` };
    userId = await Spotify.getCurrentUserId();

    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const playlistId = jsonResponse.id;
        console.log("response playlist", jsonResponse);
        console.log("playlist", playlistId);
        return jsonResponse;
      });
  },
  async getPlaylistTracks(playlistId) {
    token = await Spotify.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tracks: ${response.status}`);
      }

      const data = await response.json();
      console.log("Playlist Tracks:", data.items);

      return data.items;
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
      return [];
    }
  },

  moveNext() {
    return fetch(nextPage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        nextPage = jsonResponse.tracks.next;
        moveNextResponse = jsonResponse.tracks?.items;

        if (!jsonResponse.tracks) {
          return [];
        }
        return Spotify.responseHandler(moveNextResponse);
      });
  },
  async addTrackToPlaylist  (playlistId, trackUri) {
    token = await Spotify.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ uris: [trackUri] }),
    });
  
    if (!response.ok) {
      console.error("Failed to add track:", response.statusText);
      return;
    }
  
    console.log("Track added successfully!");
  },
  async removeTrackFromPlaylist (playlistId, trackUri) {
    token = await Spotify.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tracks: [{ uri: trackUri }], 
      }),
    });
  
    if (!response.ok) {
      console.error("Failed to remove track:", response.statusText);
      return;
    }
  
    console.log("✅ Track removed successfully!");
  },
  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    if (!userId) {
      Spotify.getCurrentUserId();
    }
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const playlistId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
          {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      });
  },
};

export { Spotify, nextPage };
