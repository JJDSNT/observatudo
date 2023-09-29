/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["typeorm"],
        pageDataCollectionTimeout: 200000,
      },
}

module.exports = nextConfig
