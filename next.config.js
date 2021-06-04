const withPWA = require('next-pwa')

module.exports = withPWA({
  i18n: {
    locales: ['en-US', 'en', 'es', 'es-CO'],
    defaultLocale: 'en-US',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  pwa: {
    dest: 'public',
  },
  trailingSlash: true,
});
