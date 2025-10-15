/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/kadai-movie-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/kadai-movie-app/' : '',
};

module.exports = nextConfig;

