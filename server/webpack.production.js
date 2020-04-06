const pkg = require('../package.json')
const path = require('path')
const webpackBaseConfig = require('../webpack.base')
const merge = require('webpack-merge')

module.exports = () =>
  merge(
    {
      mode: 'production',
      target: 'node',
      devtool: 'source-map',
      entry: path.resolve(__dirname, 'src', 'server.ts'),
      output: {
        path: path.resolve('dist', 'server'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: pkg.name + '-backend',
      },
    },
    webpackBaseConfig(__dirname, true),
  )
