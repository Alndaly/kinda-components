const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

/**
 * @type {import('webpack'.Configuration)}
 * 补充webpack配置文件的vscode语法提示
 */
module.exports = {
	target: 'web',
	entry: {
		main: path.resolve(__dirname, '../src/index.tsx'),
		utils: path.resolve(__dirname, '../src/utils/index.ts'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		// filename: '[name].[contenthash].bundle.js',
		filename: '[name].js',
	},
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'all',
		},
		runtimeChunk: 'single',
		minimizer: [
			new TerserPlugin({
				exclude: /\.js(\?.*)?$/i,
			}),
		],
	},
	module: {
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' },
			{ test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
			{ test: /\.json$/, use: 'json-loader' },
			{
				test: /\.s[ac]ss$/i,
				use: [
					// 将 JS 字符串生成为 style 节点
					'style-loader',
					// 将 CSS 转化成 CommonJS 模块
					'css-loader',
					// 自定义css文件前缀
					'postcss-loader',
					// 将 Sass 编译成 CSS
					'sass-loader',
				],
			},
			{
				test: /\.jsx$/,
				use: ['babel-loader'],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.less$/i,
				use: [
					// compiles Less to CSS
					'style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
			},
		],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		// 插件自动生成html并挂载js文件
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
			title: 'Kinda App',
		}),
		new CleanWebpackPlugin(),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};
