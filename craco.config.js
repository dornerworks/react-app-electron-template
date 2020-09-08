const path = require('path');

module.exports = {
  webpack: {
    configure: {
      context: path.join(__dirname, './src'),
      target: 'web'
    }
  }
};
