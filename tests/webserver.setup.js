import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config.js';
const compiler = Webpack(webpackConfig);
const devServerOptions = {
  ...webpackConfig.devServer,
};

const server = new WebpackDevServer(devServerOptions, compiler);

export default server;