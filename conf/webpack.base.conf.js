const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    resolve: {
        alias: {
            '~': 'src'
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true 
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'

                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: `./postcss.config.js`
                            }
                        }
                    }
                ]
            }, {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                        
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: `./postcss.config.js`
                            }
                        }
                    }, {
                        loader: 'sass-loader',
            
                    }
                ]
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/[name].[hash].css`
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
            inject: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/img`,
                    to: `img/`
                },
                {
                    from: `${PATHS.src}/fonts`,
                    to: `fonts/`
                },
                {
                    from: `${PATHS.src}/static`,
                    to: ``
                } 
            ],
        })
    ]
};