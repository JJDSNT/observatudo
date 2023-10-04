/** @type {import('next').NextConfig} */

const nextConfig = {
  staticPageGenerationTimeout: 300000,
  
  experimental: {
    serverComponentsExternalPackages: ["typeorm","typedi"],
    serverMinification: false,
  },
}

module.exports = nextConfig
