const path = require("path");
console.log(__dirname);

module.exports = {
  entry: {
    main: "./src/main.js"
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../build/js"),
    publicPath: "/js"
  },
  devServer: {
    contentBase: "build"
  }
};
