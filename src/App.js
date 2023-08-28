import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/edit' component={EditPage} exact />
      </Switch>
    </Router>
  );
};

export default App;
