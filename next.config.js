/** @type {import('next').NextConfig} */

const nextConfig = {
  staticPageGenerationTimeout: 200,

  experimental: {
    serverComponentsExternalPackages: ["typeorm","typedi"],
    serverMinification: false, //typeorm
    esmExternals: 'loose', //oci sdk
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})



module.exports = withBundleAnalyzer(nextConfig);
