const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      "isomorphic-dompurify": path.join(__dirname, 'node_modules/isomorphic-dompurify'),
    }
  }
};
