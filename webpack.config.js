const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractTextPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

const config = {
  entry: path.resolve(__dirname, "src/scripts/index.js"),
  output: {
    filename: "[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractTextPlugin.loader,
            options: {
              hmr: isDevelopment,
            },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: "file-loader?name=images/[name].[hash].[ext]",
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: "file-loader?name=fonts/[name].[hash].[ext]",
      },
    ],
  },
  plugins: [
    new MiniCssExtractTextPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
    new HtmlWebPackPlugin({
      inject: false,
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
        },
      ],
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
  },
};

module.exports = config;
