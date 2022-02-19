const fetch = require('node-fetch');

const fetchWithJwtAuth = async (url, token, options = {}) => {
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

module.exports = { fetchWithJwtAuth };
