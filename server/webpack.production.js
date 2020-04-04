const webpack = require('webpack')
const pkg = require('../package.json')
const path = require('path')
module.exports = () => (
    {
      plugins: [new webpack.ProgressPlugin()],
      mode: 'production',
      target: 'node',
      devtool: 'source-map',
      entry: path.resolve('server', 'index.ts'),
      output: {
        path: path.resolve('dist', 'server'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: pkg.name + '-backend',
      },
      module: {
        rules: [
          // {
          //   enforce: 'pre',
          //   test: /\.(ts)$/,
          //   exclude: /node_modules/,
          //   loader: 'eslint-loader',
          //   options: {
          //     emitError: false,
          //   },
          // },
          {
            test: /\.(ts)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          }
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
      },
    }
  )
