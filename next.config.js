const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  amp: {
    // validator: './custom_validator.js',
    skipValidation: true,
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  ...withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    ...withLess(
      withSass({
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      }),
    ),
  }),
};
