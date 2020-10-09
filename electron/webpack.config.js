const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'electron.js'
  },
  devtool: 'inline-source-map',
  target: 'electron-main',
  mode: 'production',
  node: {
    // TRICKY: don't let webpack hard-code these
    __dirname: false,
    __filename: false
  }
};
