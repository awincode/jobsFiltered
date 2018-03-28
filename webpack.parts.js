const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractTextPluginLazy = require('extract-text-webpack-plugin');

const PurifyCSSPlugin = require('purifycss-webpack');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

// see https://github.com/teamable-software/css-chunks-html-webpack-plugin/blob/master/examples/webpack.config.js
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssChunkHashPlugin = require('css-chunks-html-webpack-plugin');

// https://github.com/mastilver/dynamic-cdn-webpack-plugin
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

exports.indexTemplate = options => ({
	plugins: [
		new HtmlWebpackPlugin({
			template: require('html-webpack-template'),
			title: options.title,
			appMountId: options.appMountId,
			inject: false
		})
	]
});

exports.extractBundles = bundles => ({
    plugins: bundles.map(
	bundle => new webpack.optimize.CommonsChunkPlugin(bundle)    
    ),
});

exports.purifyCSS = ({ paths, purifyOptions }) => ({
    plugins: [new PurifyCSSPlugin({ paths, purifyOptions })],
});

exports.extractCSS = ({ include, exclude, use }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
		// `allChunks` is needed with CommonsChunkPlugin to extract
		// from extracted chunks as well.
		allChunks: true,
		filename: 'css/[name].[contenthash].css',
    });

    return {
		module: {
			rules: [{
					test: /\.css$/,
					include,
					exclude: /lazy\.css$/, 

					use: plugin.extract({
						use,
						fallback: 'style-loader',
					}),
				},
			],
		},
		plugins: [plugin],
    };
    
};  // end of exports.extractCSS

exports.extractCSSlazy = ({ include, exclude, use }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPluginLazy({
		// `allChunks` is needed with CommonsChunkPlugin to extract
		// from extracted chunks as well.
		allChunks: true,
		// --> changed
		filename: 'css/lazy.[contenthash].css',
    });

    return {
		module: {
			rules: [{
					test: /lazy\.css$/,
					include,
					exclude,
					use: plugin.extract({
					use,
					fallback: 'style-loader',
					}),
				},
			],
		},
		plugins: [plugin],
    };
    
};  // end of exports.extractCSSlazy

// see https://github.com/faceyspacey/extract-css-chunks-webpack-plugin
exports.extractCssChunks = ({ include, exclude, use, title }) => {
    return {
	module: {
		rules: [{
				test: /\.css$/,
				include,
				exclude,

				use: ExtractCssChunks.extract({
					use,
				}),
			},
		],
	},
	plugins: [
		new ExtractCssChunks(),
		new CssChunkHashPlugin(),
		new HtmlWebpackPlugin({ title }),
	],
    };
    
};  // end of exports.extractCssChunks



// see https://github.com/faceyspacey/extract-css-chunks-webpack-plugin
exports.extractCdn = ({ title }) => {
    return {
		plugins: [
			// new HtmlWebpackPlugin(),
			new HtmlWebpackPlugin({ title }),
			new DynamicCdnWebpackPlugin({ env: 'production' }),
		],
    };
    
};  // end of exports.extractCdn



exports.autoprefix = () => ({
    loader: 'postcss-loader',
    options: {
		plugins: () => [require('autoprefixer')()],
    },
});

exports.loadCSS = ( { include, exclude } = {}) => ({
    module: {
		rules: [{
			test: /\.css$/,
			include,
			exclude,
			
			use: ['style-loader', 'css-loader'],
		}],
    },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
		rules: [{
				test: /\.(png|jpg|svg)$/,
				include,
				exclude,
				use: {
					loader: 'url-loader',
					options,
				},
			},
		],
    },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
    module: {
		rules: [{
				// Capture eot, ttf, woff, and woff2
				test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				include,
				exclude,
				use: {
					loader: 'file-loader',
					options,
				},
			},
		],
    },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
		rules: [
			{
				test: /\.js$/,
				include,
				exclude,
				use: 'babel-loader',
			},
		],
    },
});

exports.loadJSX = ({ include, exclude } = {}) => ({
    module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include,
				exclude,
				loader: 'babel-loader',
			},
		],
    },
});

exports.lintJSX = (include) => ({
    module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				loaders: ['eslint-loader'],
				include: include
			},
		],
    },
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});

exports.clean = path => ({
    plugins: [new CleanWebpackPlugin([path])],
});

exports.enableReactPerformanceTools = function() {
	return {
		module: {
			loaders: [{
					test: require.resolve('react'),
					loader: 'expose?React'
				}
			]
		}
	};
}
  
exports.devServer = (options) => ({
	devServer: {
		// Enable history API fallback so HTML5 History API based
		// routing works. This is a good default that will come
		// in handy in more complicated setups.
		historyApiFallback: true,
		// historyApiFallback: {
		// 	index: 'index.html',
		// },

		// Unlike the cli flag, this doesn't set
		// HotModuleReplacementPlugin!
		// hot: true,
		hot: false,  // this during d3Update
		// inline: true,

		// Display only errors to reduce the amount of output.
		stats: 'errors-only',

		// Parse host and port from env to allow customization.
		//
		// If you use Vagrant or Cloud9, set
		// host: options.host || '0.0.0.0';
		//
		// 0.0.0.0 is available to all network devices
		// unlike default `localhost`.
		host: options.host, // Defaults to `localhost`
		port: options.port // Defaults to 8080
	},
	plugins: [
		// Enable multi-pass compilation for enhanced performance
		// in larger projects. Good default.
		new webpack.HotModuleReplacementPlugin({
			// multiStep: true
			multiStep: false  // due to bug, see: https://github.com/jantimon/html-webpack-plugin/issues/716
		})
	],
	watchOptions: (options.poll ? {
		// Delay the rebuild after the first change
		aggregateTimeout: 300,
		// Poll using interval (in ms, accepts boolean too)
		poll: 1000
	}: {})

});

exports.attachRevision = () => ({
    plugins: [
	new webpack.BannerPlugin({
		banner: new GitRevisionPlugin().version(),
	}),
    ],
});

exports.minifyJavaScript = () => ({
    plugins: [new UglifyWebpackPlugin()],
});

exports.minifyCSS = ({ options }) => ({
    plugins: [
		new OptimizeCSSAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: options,
			canPrint: false,
		}),
    ],
});

exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
		plugins: [new webpack.DefinePlugin(env)],
    };
};

exports.cdnList = () => ({
    lodash: {
	name: 'lodash', 
	url: 'https://unpkg.com/lodash@[version]/lodash.min.js', 
//	version: version, 
	var: '_'
    },
});