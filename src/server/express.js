import express from "express";
const server = express();
import path from "path";

const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  const webpack = require("webpack");
  const config = require("../../config/webpack.dev.js");
  const compiler = webpack(config);

  const webpackDevMiddleware = require("webpack-dev-middleware")(
      compiler,
      config.devServer
  );

  const webpackHotMiddlware = require("webpack-hot-middleware")(
      compiler,
      config.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddlware);

  console.log("Middleware enabled");
}

const staticMiddleware = express.static("build");
server.use(staticMiddleware);

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
})
