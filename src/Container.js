import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Context from "./util/Context";
import AddGroup from "./AddGroup";
import ViewGroups from "./ViewGroups.js";

export default function Container() {
  const [groups, setGroups] = useState([]);

  function renderAdd() {
    return <AddGroup />;
  }
  function renderViewGroups() {
    return <ViewGroups />;
  }

  function addGroup(data) {
    let newGroups = [...groups];
    newGroups.push(data);
    setGroups(newGroups);
  }

  return (
    <Context.Provider value={{ groups, addGroup }}>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/groups/add" />} />
          <Route path="/groups/add" render={renderAdd} />
          <Route path="/groups" render={renderViewGroups} />
        </Switch>
      </Router>
    </Context.Provider>
  );
}
