/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // keep visited routes in the client router cache so back/forward and
    // repeat navigations render instantly without refetching
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
    // import only the icons actually used instead of whole icon sets
    optimizePackageImports: ['react-icons'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
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
