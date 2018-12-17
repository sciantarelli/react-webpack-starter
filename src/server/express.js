import express from "express";
const server = express();
import path from "path";
import React from "react";

import webpack from "webpack";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";

import configDevClient from "../../config/webpack.dev-client.js";
import configDevServer from "../../config/webpack.dev-server.js";
import configProdClient from "../../config/webpack.prod-client.js";
import configProdServer from "../../config/webpack.prod-server";

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

if (isDev) {
  const compiler = webpack([configDevClient, configDevServer]);
  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];

  const webpackDevMiddleware = require("webpack-dev-middleware")(
      compiler,
      configDevClient.devServer
  );

  const webpackHotMiddleware = require("webpack-hot-middleware")(
      clientCompiler,
      configDevClient.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);
  server.use(webpackHotServerMiddleware(compiler));

  console.log("Middleware enabled");
} else {
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const render = require("../../build/prod-server-bundle.js").default;
    const expressStaticGzip = require("express-static-gzip");

    server.use(
        expressStaticGzip("dist", {
          enableBrotli: true
        })
    );

    server.use(render());
  });
}

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
