var getPages = require('./npm_tasks/get-pages');
var path = require('path');

// Prep all entry points
var entry = {};
getPages().forEach(function (page) {
  entry[page] = './src/pages/' + page + '/' + page + '.jsx';
});

module.exports = {
  entry: entry,
  devtool: 'source-map', //not good for ff
  output: {
    path: __dirname + '/dest/js',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders:  ['babel-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.jsx$/,
        loaders:  ['babel-loader', 'jsx-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: [path.resolve(__dirname, 'src'),  path.resolve(__dirname, 'node_modules')]
      }
    ]
  }
};
