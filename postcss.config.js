const postcssPresetEnv = require(`postcss-preset-env`);
const postcssBrowserReporter = require(`postcss-browser-reporter`);
const postcssReporter = require(`postcss-reporter`);
const flexBugsFixes = require('postcss-flexbugs-fixes');

module.exports = () => ({
  plugins: [
    postcssPresetEnv(),
    postcssBrowserReporter(),
    postcssReporter(),
    flexBugsFixes(),
  ],
});
