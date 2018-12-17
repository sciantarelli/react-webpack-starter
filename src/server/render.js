import React from "react";
import ReactDOMServer from "react-dom/server";
import App from '../components/app';

export default () => (req, res) => {
  res.send(`
      <html>
      <head>
        <link href="/main.css" rel="stylesheet" />
        <title>Title Tester</title>
      </head>
  
      <body>
        <div id="root">${ReactDOMServer.renderToString(<App />)}</div>
        <script src="/vendor-bundle.js"></script>
        <script src="/main-bundle.js"></script>
      </body>
      </html>
    `);
}