const path = require('path');

module.exports = {
    context: path.join(__dirname, '../src'),
    entry: '.',
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'main.js',
    },
    devtool: 'inline-source-map',
    target: 'web',
    mode: 'production',
    node: {
        // TRICKY: don't let webpack hard-code these
        __dirname: false,
        __filename: false
    }
};