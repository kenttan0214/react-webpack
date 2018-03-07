const webpack = require('webpack');
const process = require('process');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sharedConfig = require('./webpack.config.shared.js');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    mode: isProduction ? 'production' : 'development',
    resolve: sharedConfig.resolve,
    entry: {
        client: [
            'regenerator-runtime/runtime.js',
            ...((isProduction)
                // No hot module reloading
                ? ['./src/main.entry.js']
                // Hot module reloading
                : ['./src/main.entry-hmr.js']
            ),
        ]
    },
    output: sharedConfig.output,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: /src/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,

                            plugins: [
                                ...(isProduction ? ['react-hot-loader/babel'] : []),
                                'dynamic-import-webpack',
                            ],

                            presets: [
                                // Optimise the React build, see
                                // https://github.com/jamiebuilds/babel-react-optimize
                                ...(isProduction ? ['react-optimize'] : []),
                            ],
                        }
                    }
                ],
            },
            {
                test: /\.(png|gif|jpg|jpeg|ico|svg)$/,
                include: /src/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    stats: sharedConfig.stats,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.TARGET': JSON.stringify('BROWSER')
        }),
        new HtmlWebpackPlugin({  // Also generate a test.html
          filename: 'index.html',
          template: 'public/index.html'
        })
    ],
};

if (isProduction) {
    config.module.rules.push({
        // Common CSS
        test: /\.css$/,
        include: /src/,
        exclude: /localisations/,
        use: ExtractTextPlugin.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[hash:base64:5]'
                    }
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        }),
    },
    {
        // Localisation CSS
        test: /\.css$/,
        include: /localisations/,
        use: ExtractTextPlugin.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                    }
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        })
    });

    config.plugins.push(
        new AssetsPlugin({
            fullPath: false
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        new ExtractTextPlugin({filename: '[name].[contenthash].css'})
    );

    config.output.filename = '[name].[hash].js';
    config.devtool = '#source-map';
} else {
    // Development
    if (!isProduction) {
        config.entry.client.unshift(
            'webpack-hot-middleware/client',
        );
    }

    config.module.rules.push({
        test: /\.css$/,
        include: /src/,
        exclude: /localisations/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                    modules: true
                }
            },
            'postcss-loader'
        ]
    }, {
        test: /\.css$/,
        include: /localisations/,
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
        ]
    });

    if (!isProduction) {
        config.plugins.push(
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        );
    }

    config.devtool = 'cheap-source-map';
}

module.exports = config;
