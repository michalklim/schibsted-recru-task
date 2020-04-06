const path = require('path')
const webpackBaseConfig = require('../webpack.base')
const webpackBaseClientConfig = require('./webpack.client.base')
const merge = require('webpack-merge')

module.exports = () =>
  merge(
    {
      mode: 'production',
      output: {
        path: path.resolve('dist', 'client'),
      },
    },
    webpackBaseClientConfig,
    webpackBaseConfig(__dirname, true),
  )
