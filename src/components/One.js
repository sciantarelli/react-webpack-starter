import React from 'react';
import Counter from './Counter';

const One = () => {
  return (
    <React.Fragment>
      <h1>"Page" One</h1>

      <div>
        <img src={require("../images/fractal.jpg")} alt="fractal image" />
      </div>

      <Counter />
    </React.Fragment>
  );
};

export default One;
