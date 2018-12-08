require("./main.css");
require("./images/fractal.jpg");
require("./index.html");

var a = async args => {
  const { a, b } = args;
  await console.log('Babel Additions', a, b);
}

a({ a: 1, b: 2 });