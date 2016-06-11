const Webpack = require("webpack");

module.exports = {
  devtool: 'source-map',
  entry: './src/app.jsx',
  output: {
    path: './public',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        plugins: [
          'transform-react-display-name',
          'transform-class-properties',
          'transform-es2015-destructuring',
          'transform-object-rest-spread'
        ]
      }
    }]
  },
  plugins: [
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  }
};
