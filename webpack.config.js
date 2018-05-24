const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'dist/assets'
      }
    ])
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
};

if (isDevelopment) {
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'postcss-loader']
  });
} else {
  config.module.rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'postcss-loader'
    })
  });
  config.plugins.push(new ExtractTextPlugin('styles.css'));
}

module.exports = config;
