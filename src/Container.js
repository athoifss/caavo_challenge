import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AddGroup from "./AddGroup";

export default function Container() {
  function renderAdd() {
    return <AddGroup />;
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/add" />} />
        <Route path="/add" render={renderAdd} />
      </Switch>
    </Router>
  );
}
