const webpack = require("webpack");
const PATHS = require("./paths");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "main.css",
    disable: process.env.NODE_ENV === "development"
});

const productionPlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
});
const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  comments: false,
  beautify: false,
  mangle: {
    screw_ie8: true,
    keep_fnames: true
  },
  compress: {
    screw_ie8: true
  }
});

const prodConfig = {
  entry: [
    PATHS.src
  ],
  output: {
    path: PATHS.build,
    filename: "index.js",
    publicPath: "/",
    library: "reactDateRangeFork",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: [
          PATHS.demo,
          /node_modules/
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: "css-loader" }, 
            { loader: "sass-loader" }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [productionPlugin, uglifyJsPlugin, extractSass],
  externals: [
    "react",
    "react-dom",
    "webpack"
  ]
};

module.exports = prodConfig;
