/* eslint-env node */
const { join } = require('path')
/* eslint-disable node/no-unpublished-require */
const { DefinePlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* eslint-enable */

const { env } = process

const DEVELOPMENT = env.NODE_ENV === 'development'
const PRODUCTION = env.NODE_ENV === 'production'

const devServerPort = env.PORT || 3005

const SRC = join(__dirname, 'src')
const DEST = join(__dirname, 'build')
const STATIC = join(__dirname, 'public')

const WEBPACK_CONFIG = {
  mode: DEVELOPMENT ? 'development' : 'production',

  context: SRC,

  entry: {
    bundle: './index.js'
  },

  output: {
    path: DEST,
    filename: '[name].js',
    publicPath: '/'
  },

  devServer: {
    port: devServerPort,
    host: '0.0.0.0',
    historyApiFallback: true,
    contentBase: DEST,
    proxy: {
      '/api': 'http://localhost:3006'
    }
  },

  devtool: PRODUCTION === true ? false : 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CleanWebpackPlugin([DEST]),
    new CopyWebpackPlugin([{ from: join(__dirname, 'public') }], {
      ignore: ['index.html']
    }),
    new HtmlWebpackPlugin({
      template: join(STATIC, 'index.html'),
      filename: join(DEST, 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ]
}

module.exports = WEBPACK_CONFIG
