/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== 'production' || process.env.ENVIRONMENT === 'local',
  },
};

if (process.env.NODE_ENV === 'development' || process.env.DEVELOPMENT === 'true' || process.env.ENVIRONMENT === 'local') {
  console.log('Running in development or local mode');
  console.log('NEXT_PUBLIC_HOST:', process.env.NEXT_PUBLIC_HOST);
  console.log('ENVIRONMENT:', process.env.ENVIRONMENT);
}

module.exports = nextConfig;