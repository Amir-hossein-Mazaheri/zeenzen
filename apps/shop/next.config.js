//@ts-check

const { withNx } = require('@nrwl/next/plugins/with-nx');
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
    remotePatterns: [
      process.env.NODE_ENV === 'production'
        ? { hostname: 'zeenzen.ir', port: '80', protocol: 'https' }
        : { hostname: 'localhost', port: '4000', protocol: 'http' },
    ],
  },
  poweredByHeader: true,
  trailingSlash: true,
  output: 'standalone',
};

module.exports = withNx(withBundleAnalyzer(nextConfig));
