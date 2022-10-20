const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const config = require('./webpack.config');

module.exports = merge(config, {
	mode: 'development',
	devServer: {
		compress: true,
		historyApiFallback: true,
		hot: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		host: 'local-ipv4',
		open: true,
		port: 4040,
	},
	plugins: [
		new ESLintPlugin({
			extensions: ['tsx', 'ts']
		}),
	],
});