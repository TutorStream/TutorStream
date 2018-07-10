const path = require('path');
var webpack = require('webpack');
const SRC_DIR = path.join(__dirname, '/client/src')
const DIST_DIR = path.join(__dirname, '/client/dist');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
      filename: 'bundle.js', 
      path: DIST_DIR,
      publicPath: '/'
    },
    mode: "production",
    devtool: 'cheap-eval-source-map',
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
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
                // options: {
                //     presets: ['react', 'es2015'],
                //     plugins: ["transform-object-rest-spread"]
                // }
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
