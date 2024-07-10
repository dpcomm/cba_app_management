const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {GenerateSW} = require('workbox-webpack-plugin');

dotenv.config();

module.exports = {
  entry: `${path.resolve(__dirname, '../src')}/index.tsx`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new WebpackPwaManifest({
      name: 'RE:CBA',
      short_name: 'RE:CBA',
      description: 'CBA 대학청년부를 위한 웹앱입니다.',
      background_color: '#ffffff',
      crossOrigin: 'use-credentials',
      theme_color: '#F16622',
      icons: [
        {
          src: path.resolve('src/assets/images/logo512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
      maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
    }),
    new GenerateSW({
      include: [/\.html$/, /\.js$/],
      maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
    }),
  ],
  resolve: {
    alias: {
      '@apis': path.resolve(__dirname, '../src/apis'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@modules': path.resolve(__dirname, '../src/modules'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@type': path.resolve(__dirname, '../src/types'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
