//@ts-check

const { withNx } = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  poweredByHeader: true,
  trailingSlash: true,
};

// module.exports = withPlugins([withNx], nextConfig);
module.exports = withNx(withBundleAnalyzer(nextConfig));
