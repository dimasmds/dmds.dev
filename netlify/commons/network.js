const getAccessTokenSpotify = async (authOptions) => {
  const {
    clientId,
    clientSecret,
    refreshToken,
  } = authOptions;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`,
  });

  const json = await response.json();
  return json.access_token;
};

const fetchWithSpotifyAuth = async (url, options = {}) => {
  const token = await getAccessTokenSpotify({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  });

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const opts = {
    ...options,
    headers,
  };

  return fetch(url, opts);
};

export { fetchWithSpotifyAuth };
