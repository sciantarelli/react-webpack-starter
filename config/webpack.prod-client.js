const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = {
  name: 'client',
  entry: {
    main: "./src/main.js",
    example: "./src/main.js"
  },
  mode: "production",
  output: {
    filename: "[name]-bundle.js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: "-",
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          minChunks: 2
        }
      }
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
    new MiniCSSExtractPlugin({
      // filename: "[name]-[contenthash].css"
      filename: "[name].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      },
      canPrint: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // new HTMLWebpackPlugin({
    //   template: "./src/index.html"
    // }),
    new MinifyPlugin(),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BrotliPlugin()
  ]
};
