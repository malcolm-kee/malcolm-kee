const Dotenv = require('dotenv-webpack');

/**
 * Custom webpack configuration for lambda
 * @see https://github.com/netlify/netlify-lambda#webpack-configuration
 */
module.exports = {
  plugins: [new Dotenv()]
};
