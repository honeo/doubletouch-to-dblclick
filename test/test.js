console.log('doubletouch-to-dblclick: test');


// modules
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const opener = require('opener');

const config = {
	entry: {
		app: [
			"webpack-dev-server/client?http://localhost:8080/",
			"webpack/hot/dev-server",
			'./test/index.js'
		]
	},
	output: {
		path: __dirname,
		filename: 'bundle_index.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				ignore: [
					'babel-polyfill',
					'core-js'
				],
				presets: [
					"babel-preset-es2015",
					"babel-preset-stage-0"
				]
			}
		}],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(), //hotの依存
	]
}

const instance = webpack(config, (err, status)=>{
	new webpackDevServer(instance, {
		contentBase: "./test/",
		hot: true,
		inline: true
	}).listen(8080);
	opener('http://localhost:8080/');
});
