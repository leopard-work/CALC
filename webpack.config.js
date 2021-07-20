const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var isprod = (process.env.NODE_ENV === 'production');
if (isprod) mmin=true;
else mmin=false;

// module
module.exports = {
    devServer: {
        publicPath : '/dist'
    },
    context: path.resolve(__dirname,'src'),

    entry: {
        app: [
            './js/app.js',
            './scss/style.scss'
        ],
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../'
    },

    devtool: isprod ? false : 'inline-source-map',

    performance: {
        maxAssetSize: 1000000,
        hints: false
    },

    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            hmr: true,
                            reloadAll: true
                        },
                    },
                    //'img-loader',
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
							outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ],
    },
    optimization: {
        minimize: mmin,
        minimizer: [
            new CssMinimizerPlugin(),
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
            }),
        ],

    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jquery': 'jquery',
            'window.jQuery': 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
            chunkFilename: './css/[id].css',
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/**/*')]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            publicPath: '',
            inject: 'body',
            minify: {
                collapseWhitespace: false,
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: "./img", to: "img",
                    globOptions: {
                        ignore: ["**/*.svg-del"],
                    },
                },
            ],
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            disable: process.env.NODE_ENV !== 'production',
            pngquant: {
                quality: '95-100'
            },
            plugins: [
                imageminMozjpeg({
                    quality: 95,
                    progressive: true
                })
            ]
        })
    ],
};

