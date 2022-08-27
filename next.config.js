/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com', 'cdn.shibe.online'],
  },
}

module.exports = nextConfig
