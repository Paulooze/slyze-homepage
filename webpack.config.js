const path = require('path');
const webpack = require('webpack');

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

let plugins = [];

if (environment === 'production') {
  plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: environment,
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
  ];
}

module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'js', 'main.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist', 'js'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins,
};
