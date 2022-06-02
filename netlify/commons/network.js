const fetch = require('node-fetch');
const config = require('./config');

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

const fetchSpotifyAuth = async (url, options = {}) => {
  const token = await getAccessTokenSpotify({
    clientId: config.spotify.clientId,
    clientSecret: config.spotify.clientSecret,
    refreshToken: config.spotify.refreshToken,
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

module.exports = { fetchSpotifyAuth };
