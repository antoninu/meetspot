const withOffline = require('next-offline');
const exportConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  exportTrailingSlash: true,
};

module.exports = withOffline(exportConfig);
