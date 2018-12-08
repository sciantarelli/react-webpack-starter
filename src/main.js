// require("babel-runtime/regenerator"); TODO: Note sure if this is needed, doesn't seem like it
require("webpack-hot-middleware/client?reload=true"); // Sent down to the client to setup the websocket connection
require("./main.css");
require("./index.html");

var a = async args => {
  const { a, b } = args;
  await console.log('Babel Additions', a, b);
}

a({ a: 1, b: 2 });