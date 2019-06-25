const postcssImport = require(`postcss-import`);
const postcssPresetEnv = require(`postcss-preset-env`);
const postcssBrowserReporter = require(`postcss-browser-reporter`);
const postcssReporter = require(`postcss-reporter`);
const flexBugsFixes = require('postcss-flexbugs-fixes');

module.exports = () => ({
  plugins: [
    postcssImport(),
    postcssPresetEnv(),
    postcssBrowserReporter(),
    postcssReporter(),
    flexBugsFixes(),
  ],
});
