const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postcssOption = {
    sourceMap: true,
    ident: 'postcss',
    plugins: () => {
        const rt = [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                flexbox: 'no-2009'
            })
        ];
        return rt;
    }
};

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
		rules: [
            {
                test: /\.js[x]?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: postcssOption
                    }
                ]
            },
            {
				test: /\.less$/,
				use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: postcssOption
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            relativeUrls: false,
                            sourceMap: true
                        }
                    }
                ]
            },
            {
				test: /\.(png|jpg|gif|jpeg|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1,
						name: './images/[name].[hash:8].[ext]'
					}
				}
            },
            {
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: false
					}
				}
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			}
        ]
    },
    optimization: {
		splitChunks: {
			name: false,
			cacheGroups: {
				common: {
					name: 'common',
					chunks: 'initial',
					minChunks: 2
				},
				vendor: {
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					priority: 10
				}
			}
		},
		runtimeChunk: {
			name: 'runtime'
		}
    },
    plugins: [
		new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
			filename: `[name].[hash].css`,
			chunkFilename: `[name].[hash].css`
		}),
    ],
    resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
    devServer: {
        contentBase: './dist',
        port: 3000
    }
};