var webpack = require('webpack')

module.exports = {
  entry: './frontend/javascripts/application.js',
  output: {
    path: './app/assets/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['react', 'es2015', 'stage-2'],
          plugins: ['transform-function-bind', 'transform-runtime']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
