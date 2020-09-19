const PREFIX = 'built';

/**
 * @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']}
 */
exports.setupWebpackConfigForWorker = ({
  actions: { replaceWebpackConfig },
  getConfig,
  stage,
}) => {
  const config = getConfig();

  let options = {};

  if (stage === 'build-javascript') {
    config.optimization.moduleIds = 'total-size';
    options = {
      name: `${PREFIX}-[1].[hash:6]`,
      regExp: '(\\w+).worker.(js|ts|coffee)$',
    };
  }

  config.module.rules.push({
    test: /\.worker\.(js|ts|coffee)$/,
    exclude: /node_modules/,
    use: { loader: 'workerize-loader', options },
  });

  config.output.globalObject = 'this';

  replaceWebpackConfig(config);
};
