/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== 'production',
  },
};

if (process.env.NODE_ENV === 'development' || process.env.DEVELOPMENT === 'true') {
  console.log('Running in development mode');
  console.log('NEXT_PUBLIC_HOST:', process.env.NEXT_PUBLIC_HOST);
}

module.exports = nextConfig;
