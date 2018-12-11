console.log(`Environment is ${process.env.NODE_ENV}`);

require("react-hot-loader/patch");
require("babel-core/register"); // Get ES6 imports working
require("./main.sass");
require("./images/fractal.jpg");
require("./index.html");
require("./index");