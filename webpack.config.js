const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  target: 'node',
  externals: [ nodeExternals() ],
  entry: {
    'index': './server/index.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.tsx?$/,  loader: 'awesome-typescript-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
}

