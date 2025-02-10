const clientId = "4075a427427f42c194d4a3686317fbc1";
const clientSecret = "5d85eff7a4754114aed39b2fe2bd9e4b";
let token = null;
let tokenExpiration = null;

// 1️⃣ Fetch a new access token
const getAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret), // Encode credentials
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  token = data.access_token;
  tokenExpiration = Date.now() + data.expires_in * 1000; // Store expiration time
  return token;
};

// 2️⃣ Get stored token or fetch a new one if expired
const getStoredAccessToken = async () => {
  if (!token || Date.now() > tokenExpiration) {
    return await getAccessToken();
  }
  return token;
};

// 3️⃣ Fetch artist data (example API call)
const fetchArtistData = async (artistId) => {
  const token = await getStoredAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

// 4️⃣ Export functions for use in other files
export { getAccessToken, getStoredAccessToken, fetchArtistData };
