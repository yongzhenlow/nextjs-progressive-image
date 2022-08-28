/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'cdn.shibe.online',
      'images.ctfassets.net',
    ],
  },
}

module.exports = nextConfig
