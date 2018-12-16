import React from 'react';
import Counter from './counter';
import { hot } from 'react-hot-loader'

const App = () => {
  return(
      <div id="main-container">
        <h1>Some Fractal</h1>

        <div>
          <img src={require("../images/fractal.jpg")}
               alt="fractal image" />
        </div>

        <Counter />
      </div>
  );
};

export default hot(module)(App);