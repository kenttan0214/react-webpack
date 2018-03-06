const path = require('path');

module.exports = {
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.css',
            `.ico`,
            `.svg`,
            '.json'
        ],
        modules: [
            'node_modules'
        ]
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/app',
        publicPath: process.env.DIST_PUBLIC_PATH
    },
    stats: 'normal'
};
