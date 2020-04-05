const webpack = require('webpack')
const pkg = require('../package.json')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = () => ({
  plugins: [new webpack.ProgressPlugin(), new Dotenv()],
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
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.json'],
  },
})
