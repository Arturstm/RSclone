const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const ESLintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'asset/img/[name][ext]',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/textbook/textbook.html'),
      filename: 'textbook.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/autorization/autorization.html'),
      filename: 'autorization.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/audio-challange/audio-challange.html'),
      filename: 'audio-challange.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/stats/stats.html'),
      filename: 'stats.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/dictionary/dictionary.html'),
      filename: 'dictionary.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/components/sprint/sprint.html'),
      filename: 'sprint.html',
      inject: false,
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['ts', 'js'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/main-assets'),
          to: path.resolve(__dirname, '../dist/main-assets')
        },
      ],
    }),
  ],
  experiments: {
    topLevelAwait: true
  }
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};