const webpack = require('webpack');

const path = require('path');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const ENABLE_POLLING = process.env.ENABLE_POLLING;

const PATHS = {
	// app: path.join(__dirname, 'app'),
	// app: path.join(__dirname, 'immutable1'),
	app: path.join(__dirname, 'jobsAW'),
	build: path.join(__dirname, 'build'),
};
//										console.log('PATHS.build', PATHS.build)
const commonConfig = (env) => {
    return merge([{
			entry: {
				app: PATHS.app,
			},
			output: {
				path: PATHS.build,
				filename: '[name].js',
			},
			resolve: {
				// extensions: ['.js', '.jsx']
				extensions: ['.json', '.js', '.jsx']
			},
			plugins: [

			],
		},  // end of merge first element
		
		parts.indexTemplate({
			title: 'AW React Showcase',
			appMountId: 'root'
		}),

		parts.loadJSX({ include: PATHS.app, exclude: /(node_modules)/ }),  // exclude is new
		parts.lintJSX(PATHS.app)

	])  // end of merge
    
};  // end of commonConfig


// order matters. CSS extraction has to happen before purifying.
const productionConfig = (env) => {
    return merge([

		{
			performance: {
				hints: 'warning',  // "error" or false are valid too
				maxEntrypointSize: 50000,  // in bytes, default 250k
				maxAssetSize: 450000,  // in bytes
			},
			output: {
				chunkFilename: '[name].[chunkhash].js',
				filename: '[name].[chunkhash].js',
			},
			recordsPath: path.join(__dirname, 'records.json'),
		},

		parts.clean(PATHS.build),

			parts.minifyJavaScript(),

		parts.minifyCSS({
			options: {
			discardComments: {
				removeAll: true,
			},
			// Run cssnano in safe mode to avoid
			// potentially unsafe transformations.
			safe: true,
			},
		}),

		parts.generateSourceMaps({ type: 'source-map' }),

		parts.extractCSS({
			use: ['css-loader', parts.autoprefix()],

		//	    exclude: /lazy/,  // test AW
		//	    exclude: /lazy\.css$/,  // test AW
		}),

		parts.loadImages({
			options: {
			limit: 15000,
			name: './img/[name].[hash].[ext]'
			}
		}),

		parts.extractBundles([{
				name: 'vendor',
				minChunks: ({ resource }) => /node_modules/.test(resource) && resource.match(/\.js$/),
			},

			// manifest has to be the last definition
			{
				name: 'manifest',
				minChunks: Infinity,
			},
			
		]),  // end of .extractBundles

		parts.setFreeVariable('process.env.NODE_ENV', 'production'),

    ]);  // end of merge

};  // end of productionConfig


const developmentConfig = (env) => {
    return merge([

		// source maps
		{
			output: {
				devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
			}
		},
		parts.generateSourceMaps({
			type: 'cheap-module-eval-source-map'
		}),

		parts.devServer({
			// Customize host/port here if needed
			host: process.env.HOST,
			port: process.env.PORT,
			poll: ENABLE_POLLING
		}),
		parts.enableReactPerformanceTools(),
			
		parts.loadCSS(),
		parts.loadImages(),

    ]);

};  // end of developmentConfig


module.exports = env => {
    
    if (env === 'production') {
		return merge(commonConfig(env), productionConfig(env));
    }

    return merge(commonConfig(env), developmentConfig(env));
};

