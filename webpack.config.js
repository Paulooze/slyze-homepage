const path = require('path');
const webpack = require('webpack');

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

console.log(`Building for environment ${environment}`); // eslint-disable-line no-console

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
  resolve: {
    alias: {
      vue: 'vue/dist/vue.common.js',
    },
  },
  devtool: false,
  context: __dirname,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    environment === 'production' && new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
  ],
};
