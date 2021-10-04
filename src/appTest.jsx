import React from "react";
import { ProvideAuth } from "./hooks/useAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./login";
import Main from "./routes/main";

import Signup from "./signup";
// import PrivateRoute from "./PrivateRoute";

const AppTest = () => {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default AppTest;
