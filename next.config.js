/** @type {import('next').NextConfig} */

const nextConfig = {
  staticPageGenerationTimeout: 300000,
  
  experimental: {
    serverComponentsExternalPackages: ["typeorm","typedi"],
    serverMinification: false, //typeorm
    esmExternals: 'loose', //oci sdk
  },
}

module.exports = nextConfig
