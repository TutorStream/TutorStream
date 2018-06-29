const path = require('path')
const SRC_DIR = path.join(__dirname, '/client/src')
const DIST_DIR = path.join(__dirname, '/client/dist')

module.exports = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
      filename: 'bundle.js',
      path: DIST_DIR,
      publicPath: '/'
    },
    module: {
        rules: [
        {
            test: /\.jsx?/,
            include: SRC_DIR,
            loader: 'babel-loader',
            options: {
                presets: ['react', 'es2015']
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