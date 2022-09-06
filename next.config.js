/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      process.env.NEXT_PUBLIC_IMAGE_SERVER,
      "via.placeholder.com",
    ],
  },
};

module.exports = nextConfig;
