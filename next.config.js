const withOffline = require('next-offline');
const exportConfig = {
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
  trailingSlash: true,
};

module.exports = withOffline(exportConfig);
