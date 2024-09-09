/** @type {import('next').NextConfig} */
const nextConfig = {}

if (process.env.DEVELOPMENT === 'true') {
    nextConfig.typescript = {
      ignoreBuildErrors: true,
    };
  }
  

module.exports = nextConfig
