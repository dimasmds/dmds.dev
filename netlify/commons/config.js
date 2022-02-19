const dotenv = require('dotenv');

dotenv.config();

const config = {
  spotify: {
    token: process.env.SPOTIFY_TOKEN,
  },
};

module.exports = config;
