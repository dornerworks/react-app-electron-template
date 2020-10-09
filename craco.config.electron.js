let config = require('./craco.config');
const _ = require('lodash');

module.exports = _.merge(config, {
  webpack: {
    configure: {
      target: 'electron-renderer',
      output: {
        filename: 'main.js'
      }
    }
  }
});
