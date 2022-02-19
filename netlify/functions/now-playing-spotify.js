const config = require('../commons/config');
const { fetchWithJwtAuth } = require('../commons/network');

exports.handler = async () => {
  const response = await fetchWithJwtAuth('https://api.spotify.com/v1/me/player/currently-playing', config.spotify.token);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Now Playing Spotify!',
      data: {
        artist: data.item.artists[0].name,
        track: data.item.name,
        album: data.item.album.name,
        image: data.item.album.images[0].url,
        url: data.item.external_urls.spotify,
      },
    }),
  };
};
