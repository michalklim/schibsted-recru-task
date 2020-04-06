const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['react-hot-loader/patch', path.resolve(__dirname, 'src', 'index.tsx')],
  output: {
    path: path.resolve('.tmp'),
    filename: 'index.js',
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
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            configFile: path.resolve('babel.config.js'),
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
  ],
}
