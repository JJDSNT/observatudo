/** @type {import('next').NextConfig} */

const nextConfig = {
  staticPageGenerationTimeout: 300000,
  experimental: {
    serverComponentsExternalPackages: ["typeorm"],
  },
}

module.exports = nextConfig
