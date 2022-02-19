const dotenv = require('dotenv');

dotenv.config();

const config = {
  spotify: {
    token: process.env.SPOTIFY_TOKEN,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  },
};

module.exports = config;
