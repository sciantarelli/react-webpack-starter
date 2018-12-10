// require("babel-runtime/regenerator"); TODO: Note sure if this is needed, doesn't seem like it
require("react-hot-loader/patch");
require("babel-core/register"); // Get ES6 imports working
require("webpack-hot-middleware/client?reload=true"); // Sent down to the client to setup the websocket connection
require("./main.sass");
require("./images/fractal.jpg");
require("./index.html");
require("./index");