//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [
      process.env.NODE_ENV === 'production'
        ? { hostname: 'zeenzen.ir', port: '80', protocol: 'https' }
        : { hostname: 'localhost', port: '4000', protocol: 'http' },
    ],
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  output: 'standalone',
};

module.exports = withNx(nextConfig);
