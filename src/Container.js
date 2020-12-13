import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Context from "./util/Context";
import AddGroup from "./AddGroup";
import ViewGroups from "./ViewGroups.js";
import UpdateGroup from "./UpdateGroup";

export default function Container() {
  const [groups, setGroups] = useState([
    { name: "Default Group", desc: "Default description", img: null, users: [] },
  ]);

  function renderAdd() {
    return <AddGroup />;
  }
  function renderViewGroups() {
    return <ViewGroups />;
  }
  function renderUpdateGroup() {
    return <UpdateGroup />;
  }

  function addGroup(data) {
    let newGroups = [...groups];
    newGroups.push(data);
    setGroups(newGroups);
  }

  function updateGroup(data, id) {
    let newGroups = [...groups];
    newGroups[id] = data;
    setGroups(newGroups);
  }

  return (
    <Context.Provider value={{ groups, addGroup, updateGroup }}>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/groups" />} />
          <Route path="/group/add" exact render={renderAdd} />
          <Route path="/group/:id" exact render={renderUpdateGroup} />
          <Route path="/groups" render={renderViewGroups} />
        </Switch>
      </Router>
    </Context.Provider>
  );
}
