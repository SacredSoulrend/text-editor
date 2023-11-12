const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTML Webpack Plugin for generating HTML files
      new HtmlWebpackPlugin({
        template: './index.html', 
        chunks: ['main'],
      }),

      // Webpack PWA Manifest Plugin for generating the manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JATE Text Editor',
        short_name: 'JATE',
        description: 'JATE (Just Another Text Editor) is a simple text editor application. This project includes a React-based frontend and utilizes service workers for offline functionality.',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

      // Workbox InjectManifest Plugin for generating the service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js', 
      }),
    ],

    module: {
      rules: [
        // CSS Loader Configuration
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Babel Loader Configuration
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};