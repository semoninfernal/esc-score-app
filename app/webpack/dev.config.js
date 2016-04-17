var fs = require('fs');
var qs = require('qs');
var path = require('path');
var webpack = require('webpack');
var host = 'localhost';
var port = parseInt(process.env.PORT) + 1 || 3001;
var assetsPath = path.resolve(__dirname, '../static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};
var babelLoaderQuery;

try {
	babelrcObject = JSON.parse(babelrc);
} catch (err) {
	console.error('==>     ERROR: Error parsing your .babelrc.');
	console.error(err);
}

babelrcObject.presets.push('react-hmre');
console.info('Babel loader options:', babelrcObject);
babelLoaderQuery = qs.stringify(babelrcObject, { arrayFormat: 'brackets', encode: false });

module.exports = {
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		main: [
			'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
			'./src/client.js'
		]
	},
	output: {
		path: assetsPath,
		filename: '[name]-[hash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: 'http://' + host + ':' + port + '/dist/'
	},
	module: {
		loaders: [
			{ test: /.js$/, exclude: /node_modules/, loaders: ['babel?' + babelLoaderQuery, 'eslint-loader']},
			{ test: /\.scss$/, loader: 'style!css?modules&sourceMap&localIdentName=[local]!sass?outputStyle=expanded&sourceMap' },
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
			{ test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
		]
	},
	sassLoader: {
		includePaths: [path.resolve(__dirname, '../src/theme')]
	},
	progress: true,
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules'
		],
		extensions: ['', '.json', '.js']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.IgnorePlugin(/webpack-stats\.json$/),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: true
		}),
		webpackIsomorphicToolsPlugin.development()
	]
};
