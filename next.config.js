const customWebpack = (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
  if (isServer && !dev) {
    if (Array.isArray(config.optimization.minimizer)) {
      const terserIndex = config.optimization.minimizer.findIndex(
        (minimizer) => minimizer.constructor.name === 'TerserPlugin'
      );
      if (terserIndex > -1) {
        config.optimization.minimizer[terserIndex].options.terserOptions = {
          ...config.optimization.minimizer[terserIndex].options.terserOptions,
          compress: false,
          mangle: false,
        };
      }
    }
  }
  return config;
};

const withPWA = require("next-pwa")({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === 'development',
  },
});

const plugins = []



if (process.env.ANALYZE === 'true') {
  // only load dependency if env `ANALYZE` was set
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })

  plugins.push(withBundleAnalyzer)
}

plugins.push(withPWA)

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: true,
  staticPageGenerationTimeout: 200,
  compiler: {
//    removeConsole: process.env.NODE_ENV !== 'development',
  },
  experimental: {
    serverComponentsExternalPackages: ["typeorm", "typedi"],
    serverMinification: false, //typeorm
    esmExternals: 'loose', //oci sdk
  },
}


module.exports= {...nextConfig,...withPWA}
