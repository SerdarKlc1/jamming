const clientId = "4075a427427f42c194d4a3686317fbc1";
const clientSecret = "5d85eff7a4754114aed39b2fe2bd9e4b";
let token = null;
let tokenExpiration = null;

const getAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(clientId + ":" + clientSecret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  const result = await response.json();
  token = result.access_token;
  tokenExpiration = Date.now() + result.expires_in * 1000;
  return token;
};

const getStoredAccessToken = async () => {
  if (!token || Date.now() > tokenExpiration) {
    return await getAccessToken();
  }
  return token;
};

const sendPlayListtoSpotify = async (titlePlaylist) => {
  try {
    console.log("Creating playlist...");
    
    const userId = "0zacrvlxuelxqrtc92jbcdyo0";
    const accessToken = await getStoredAccessToken();
    console.log("🔑 Access Token:", accessToken);
   
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const body = {
      name: titlePlaylist,
      description: titlePlaylist,
      public: false,
    };

    const post = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!post.ok) {
      throw new Error(`HTTP error! Status: ${post.status}`);
    }

    const data = await post.json();
    console.log("Playlist Created:", data);

    return data.id; // ✅ Returns new playlist ID
  } catch (error) {
    console.error("Error creating playlist:", error);
  }
};

const addTracksToPlaylist = async (playlistId, trackUris) => {
  try {
    console.log("Adding tracks to playlist:", playlistId, trackUris);

    const accessToken = await getStoredAccessToken();
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    

    const body = {
      uris: trackUris,  // ✅ Send track URIs as an array
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("Tracks added to playlist successfully!");
  } catch (error) {
    console.error("Error adding tracks:", error);
  }
};


export { getAccessToken, getStoredAccessToken, sendPlayListtoSpotify, addTracksToPlaylist };
