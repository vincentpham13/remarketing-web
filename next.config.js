const path = require('path');

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
}
