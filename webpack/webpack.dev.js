const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		host: '127.0.0.1',
		port: '9000',
		hot: true,
		open: true,
		allowedHosts: ['alnda.cn', 'sunrise-luckyda.top', 'kinda.info', 'auto'],
		client: {
			logging: 'info',
			progress: true,
			reconnect: 5,
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		static: {
			directory: path.join(__dirname, 'public'),
		},
		compress: true,
	},
});
