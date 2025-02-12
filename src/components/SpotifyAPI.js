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


export { getAccessToken, getStoredAccessToken };
