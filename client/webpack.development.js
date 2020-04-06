const webpackBaseConfig = require('../webpack.base')
const webpackBaseClientConfig = require('./webpack.client.base')
const merge = require('webpack-merge')

module.exports = merge(
  {
    mode: 'development',
    output: {
      publicPath: '/',
    },
    devServer: {
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/api/*': 'http://localhost:3000',
      },
    },
    devtool: 'inline-source-map',
  },
  webpackBaseClientConfig,
  webpackBaseConfig(__dirname, false),
)
