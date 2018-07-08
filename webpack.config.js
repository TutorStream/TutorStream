const path = require('path');
var webpack = require('webpack');
const SRC_DIR = path.join(__dirname, '/client/src')
const DIST_DIR = path.join(__dirname, '/client/dist');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
// const webpackConfig = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
      filename: 'bundle.js', 
      path: DIST_DIR,
      publicPath: '/'
    },
    devtool: 'eval-source-map', // is this right?
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode : 'static',
            openAnalyzer: true
        }),
        new webpack.DefinePlugin({ // may have to import this module
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CompressionPlugin()
    ],
    // mode: "production", // for minificaiton --> UNNECESSARY, accounted for within DefinePlugin
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
          })
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015'],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.css$/,  
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
        }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};

// module.exports = function (env = {}) {
//     if (env.runAnalyzer) {
//         webpackConfig.plugins.push(new webpackBundleAnalyzer ({
//             analyzerMode: 'static',
//             openAnalyzer: true
//         }));
//     }
//     return webpackConfig;
// };