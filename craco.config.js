const path = require('path');

module.exports = {
  webpack: {
    configure: {
      target: 'web',
      mode: 'production',
      context: path.join(__dirname, '.'),
      entry: './src/index.js',
      module: {
        rules: [
          {
            test: /\.(t|m?j)sx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      },
      output: {
        path: path.join(__dirname, './build'),
        filename: 'main.js'
      }
    }
  }
};
