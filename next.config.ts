/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.hausvoneden.de', 'upload.wikimedia.org', 'earth.org'], // agrega todos los hostnames que uses
  },
};

module.exports = nextConfig;
