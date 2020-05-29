const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

const PAGES_DIR = `${PATHS.src}/pages/ui-kit`;
const PAGES = fs.readdirSync(PAGES_DIR);
    


module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `[name].[contenthash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    resolve: {
        extensions: [
            '.js', 
            '.pug',
            '.scss'
        ],
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
                test: /\.pug$/,
                loader: 'pug-loader'
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
                exclude: [
                    path.resolve(__dirname, 'src/static/fonts')
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/[name].[contenthash].css`
        }),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}/${page}.pug`,
            filename: `${page}.html`,
        })),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/static`,
                    to: ``
                }
            ],
        })
    ]
};