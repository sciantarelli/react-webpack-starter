import React from 'react';
import { Switch } from "react-router";
import { Route, Link } from "react-router-dom";
import universal from "react-universal-component";

const UniversalComponent = universal(props => import(`./${props.page}`));

const Routes = () => {
  return (
    <div id="main-container">
      <div id="nav">
        <Link to="/">One</Link>
        <Link to="/two">Two</Link>
        <Link to="/three">Three</Link>
      </div>

      <Switch>
        <Route exact path="/">
          <UniversalComponent page="One" />
        </Route>
        <Route exact path="/two">
          <UniversalComponent page="Two" />
        </Route>
        <Route exact path="/three">
          <UniversalComponent page="Three" />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;


