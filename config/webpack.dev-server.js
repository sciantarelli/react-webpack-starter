const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  name: 'server',
  target: "node", // Tells webpack we're using Node for the final output
  externals: nodeExternals(), // Everything in node_modules should be skipped
  entry: "./src/server/render.js", // Not sure why this should be changed to render.js instead of main.js
  output: {
    filename: "dev-server-bundle.js",
    path: path.resolve(__dirname, "../build"),
    libraryTarget: "commonjs2"
  },
  mode: "development",
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
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.jpg|png$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]",
              emitFile: false
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};
