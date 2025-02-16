const clientId = '4075a427427f42c194d4a3686317fbc1'; // Insert client ID here.
const redirectUri = 'http://localhost:3000/callback';
let next;
let token = null;
let tokenExpiration = null;

const Spotify= {
    getAccessToken() {
        if (token) {
          return token;
        }
    
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            token = accessTokenMatch[1];
          tokenExpiration = Number(expiresInMatch[1]);
          window.setTimeout(() => token = '', tokenExpiration * 1000);
          window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
          return token;
        } else {
          const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
          window.location = accessUrl;
        }
      },
getStoredAccessToken: async ()=>{
  if (!token || Date.now() > tokenExpiration) {
    return await Spotify.getAccessToken();
  }
  return token;
},
search (term) {
   
    const token = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      next=jsonResponse.tracks.next
      console.log(next);
      console.log(jsonResponse);

      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        src: `https://open.spotify.com/embed/track/${track.id}`,
        id: track.id,
        name: track.name,
        artist: track.artists?.[0]?.name || "Unknown Artist",
        album: track.album?.name || "Unknown Album",
        uri: track.uri
      }));
    });
  },
  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const token = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
}

export default Spotify