/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/analytics.js',
        destination: 'https://cloud.umami.is/script.js',
      },
    ];
  },
};

module.exports = nextConfig;
