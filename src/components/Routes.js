import React from 'react';
import { Route, Link } from "react-router-dom";
import One from "./One";
import Two from "./Two";
import Three from "./Three";

const Routes = () => {
  return (
    <div id="main-container">
      <div id="nav">
        <Link to="/">One</Link>
        <Link to="/two">Two</Link>
        <Link to="/three">Three</Link>
      </div>

      <Route exact path="/" component={One} />
      <Route exact path="/two" component={Two} />
      <Route exact path="/three" component={Three} />
    </div>
  );
};

export default Routes;


