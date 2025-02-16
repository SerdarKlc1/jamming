const clientId = '4075a427427f42c194d4a3686317fbc1'; // Insert client ID here.
const redirectUri = "https://serdarklc1.github.io/jamming/callback";
// const redirectUri='http://localhost:3000/callback' ;
let nextPage;
let response;
let moveNextResponse
let token = null;
let tokenExpiration = null;

const Spotify= {
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
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location = accessUrl;
    }
},
    // getAccessToken() {
    //     if (token) {
    //       return token;
    //     }
    
    //     const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    //     const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    //     if (accessTokenMatch && expiresInMatch) {
    //         token = accessTokenMatch[1];
    //       tokenExpiration = Number(expiresInMatch[1]);
    //       window.setTimeout(() => token = '', tokenExpiration * 1000);
    //       window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
    //       return token;
    //     } else {
    //       const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    //       window.location = accessUrl;
    //     }
    //   },
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
      nextPage=jsonResponse.tracks.next
      response=jsonResponse.tracks?.items

      if (!jsonResponse.tracks) {
        return [];
      }
      return response
    });
  },
  responseHandler (response){
    return response.map((track, i)=>({
      src:`https://open.spotify.com/embed/track/${track.id}`,
      id: track.id,
      key: track.id + i,
      name: track.name,
      artist: track.artists?.[0]?.name || "Unknown Artist",
      album: track.album?.name || "Unkown Album",
      uri: track.uri
    }))
  },
  moveNext() {
    return fetch(nextPage, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      nextPage=jsonResponse.tracks.next
      moveNextResponse=jsonResponse.tracks?.items

      if (!jsonResponse.tracks) {
        return [];
      }
      return Spotify.responseHandler(moveNextResponse)
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

export  {Spotify, nextPage, response}