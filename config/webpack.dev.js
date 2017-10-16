const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PATHS = require("./paths");

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(`${__dirname}/../demo/index.html`),
  filename: "index.html",
  inject: "body"
});
const hmrePlugin = new webpack.HotModuleReplacementPlugin();

const devConfig = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    PATHS.demo
  ],
  output: {
    path: PATHS.build,
    filename: "index.js",
    publicPath: "/"
  },
  context: PATHS.demo,
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: "babel-loader",
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ],
      }
    ]
  },
  plugins: [htmlPlugin, hmrePlugin]
};

module.exports = devConfig;
