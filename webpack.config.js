var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use:  ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: '#sourcemap',
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/static',
    publicPath: '/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },
  plugins: [
    new UglifyJsPlugin({
        uglifyOptions: {
            mangle: true,
            warnings: false,
            output: {
                comments: false
            }
        },
        sourceMap: true
    })
  ]
};