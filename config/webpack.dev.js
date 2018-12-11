const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: [
      "babel-runtime/regenerator",
      "webpack-hot-middleware/client?reload=true", // Sent down to the client to setup the websocket connection
      "./src/main.js"
    ]
  },
  mode: "development",
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
  devtool: "source-map",
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
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: "style-loader" },
      //     { loader: "css-loader" }
      //   ]
      // },
      {
        test: /\.sass$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader",
            // query: {
            //   modules: true,
            //   localIdentName: "[name]__[local]--[hash:base64:8]"
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
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
