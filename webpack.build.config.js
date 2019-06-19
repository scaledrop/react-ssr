const path = require('path');
const reactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

const env =
  process.env && process.env.NODE_ENV.trim() == "production"
    ? "production"
    : "development";

module.exports = {
  mode: env,
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].js',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new reactLoadablePlugin({
      filename: './react-loadable.json',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BrotliPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};