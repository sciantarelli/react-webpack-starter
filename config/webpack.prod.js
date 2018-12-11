const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = env => {
  return {
    entry: {
      main: "./src/main.js"
    },
    mode: "production",
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "../build"),
      publicPath: "/"
    },
    devServer: {
      contentBase: "build",
      overlay: true, // Shows errors directly in the browser window
      hot: true,
      stats: {
        colors: true
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          test: /\.sass$/,
          use: [
            { loader: MiniCSSExtractPlugin.loader },
            {
              loader: "css-loader",
              // If there's just one css file, could simply do this
              // options: {
              //   minimize: true
              // }
            },
            { loader: "sass-loader" }
          ]
        },
        {
          test: /\.jpg|png$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name].[ext]"
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {
                attrs: ["img:src"]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        },
        canPrint: true
      }),
      new MiniCSSExtractPlugin({
        filename: "[name]-[contenthash].css"
      }),
      new HTMLWebpackPlugin({
        template: "./src/index.html"
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      }),
      new MinifyPlugin()
    ]
  }
};
