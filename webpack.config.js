
const path = require('path');
const config = require('./config/server');

const webpackConfig = {
  devtool: config.devtool,
  devServer: config.devServer || {},
  entry: ['babel-polyfill', 'universal-fetch', './src/client/index.js'],

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [],
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