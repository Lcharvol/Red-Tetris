
const path = require('path');
const config = require('./config/server');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback');

const webpackConfig = {
  devtool: config.devtool,
  devServer: config.devServer || {},
  entry: ['babel-polyfill', 'universal-fetch', './src/client/index.js'],

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new BrowserSyncPlugin({
      host: '0.0.0.0',
      port: 8080,
      browser: 'google chrome',
      server: {
        baseDir: 'public',
      },
      logSnippet: false,
      reloadOnRestart: true,
      notify: false,
      middleware: [historyApiFallback()],
      snippetOptions: {
        blacklist: '*',
        rule: {
          match: /<\/body>/i,
          fn: () => '',
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/[name].[ext]',
      },
    ],
  },
};

module.exports = webpackConfig;