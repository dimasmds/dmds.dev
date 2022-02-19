const { fetchWithJwtAuth } = require('../commons/network');

exports.handler = async () => {
  const response = await fetchWithJwtAuth('https://api.spotify.com/v1/me/player/currently-playing');

  if (!response.status.toString().startsWith('2')) {
    return {
      statusCode: response.status,
      body: JSON.stringify({
        message: 'Error fetching current track',
        data: null,
      }),
    };
  }

  if (response.status === 204) {
    return {
      statusCode: 204,
      body: null,
    };
  }

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Currently playing ${data.item.name} by ${data.item.artists[0].name} on Spotify`,
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
