const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = (context, isProduction) => ({
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            configFile: path.resolve(__dirname, 'babel.config.js'),
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(context, 'tsconfig.json'),
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new Dotenv({
      systemvars: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      eslintOptions: {
        emitError: isProduction,
      },
      tsconfig: path.resolve(context, 'tsconfig.json'),
      async: !isProduction,
    }),
  ],
})
