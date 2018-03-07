var webpack = require('webpack');
var process = require('process');
var sharedConfig = require('./webpack.config.shared.js');
var nodeExternals = require('webpack-node-externals');
var isProduction = process.env.NODE_ENV === 'production';

var config = {
    mode: isProduction ? 'production' : 'development',
    resolve: sharedConfig.resolve,
    entry: {
        server: [
            'regenerator-runtime/runtime.js',
            './src/server/server.js'
        ]
    },
    target: 'node',
    output: sharedConfig.output,
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFiles: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: /localisations/,
                use: [
                    'css-loader/locals',
                    'postcss-loader'
                ]
            }
        ]
    },
    stats: sharedConfig.stats,
    plugins: [
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            entryOnly: false,
            raw: true
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.module.rules.push({
        test: /\.css$/,
        exclude: /localisations/,
        use: [
            {
                loader: 'css-loader/locals',
                options: {
                    importLoaders: 1,
                    localIdentName: '[hash:base64:5]',
                    modules: true
                }
            },
            'postcss-loader'
        ]
    });
} else {
    config.module.rules.push({
        test: /\.css$/,
        exclude: /localisations/,
        use: [
            {
                loader: 'css-loader/locals',
                options: {
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                    modules: true
                }
            },
            'postcss-loader'
        ]
    });
}

module.exports = config;
