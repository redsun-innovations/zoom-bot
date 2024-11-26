require('dotenv').config();
const jwt = require('jsonwebtoken');

// credentials 
const API_KEY = process.env.ZOOM_API_KEY;
const API_SECRET = process.env.ZOOM_API_SECRET;
const expirationTimeInSeconds = process.env.ZOOM_TOKEN_EXPIRATION;

const expirationTime = Math.floor(Date.now() / 1000) + parseInt(expirationTimeInSeconds, 10);

const payload = {
  iss: API_KEY,
  exp: expirationTime
};

const token = jwt.sign(payload, API_SECRET);

console.log('Generated JWT:', token);
