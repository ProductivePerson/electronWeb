var path = require('path');

const common = {
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

module.exports = {
  entry: path.resolve(__dirname, './src/app.jsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /src\/.+.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015&presets[]=react'
      }
    ]
  }
};
