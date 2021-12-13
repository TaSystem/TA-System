const nextEnv = require('next-env');
const withNextEnv = nextEnv();

module.exports = withNextEnv({
  reactStrictMode: true,
  env: {
    NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: process.env.NEXT_BACKEND_URL,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: 'http://localhost:3001',
  },
});
