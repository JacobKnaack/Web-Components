import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.vendor.config.js';

// silence outputs
webpackConfig.stats = 'errors-only';

const compiler = Webpack(webpackConfig);
const devServerOptions = {
  ...webpackConfig.devServer,
};

const server = new WebpackDevServer(devServerOptions, compiler);

export default server;