/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      }
    ],
  },
  // Disable SWC minification and use Terser instead
  swcMinify: false,
  // Disable React strict mode for now
  reactStrictMode: false,
  // Use Babel for transpilation
  experimental: {
    forceSwcTransforms: false
  }
};

module.exports = nextConfig;