/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    WEBSOCKET_URL: process.env.WEBSOCKET_URL,
  },
};

module.exports = nextConfig;
