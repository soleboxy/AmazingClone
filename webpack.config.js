var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "."),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties',
          ],
        }
      }
    ]
  },
  output: {
    path: __dirname + ".",
    filename: "client.min.js"
  },
  plugins: debug ? [new webpack.ProvidePlugin({$: "jquery",jQuery:"jquery", "window.jQuery": "jquery"})] : [
    new webpack.ProvidePlugin({$: "jquery",jQuery:"jquery", "window.jQuery": "jquery"}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
