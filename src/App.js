import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Container from "./Container";
import style from "./App.module.css";

export default function App() {
  return (
    <div className={style.root}>
      <Router>
        <Switch>
          <Route to="/" component={Container} />
          {/* <Route to="/login" component={Login} /> */}
        </Switch>
      </Router>
    </div>
  );
}
