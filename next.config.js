/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LOCAL_SERVER_URL: process.env.LOCAL_SERVER_URL,
  },
};

module.exports = nextConfig;
