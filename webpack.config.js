const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		path: path.resolve(__dirname, './site/index.tsx'),
	},
	module: {
		rules: [
			{
				test: /\.ts|tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								'@babel/preset-typescript',
							],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-proposal-object-rest-spread',
								[
									'import',
									{
										libraryName: 'antd',
										style: true,
									},
								],
							],
							compact: false,
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								modifyVars: {
									'font-size-base': '13px',
									'border-radius-base': '6px',
								},
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|svg|gif|webp)$/,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.tsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './site/index.html',
		}),
	],
}