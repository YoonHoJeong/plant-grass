import React from "react";
import { useAuth } from "./hooks/useAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./routes/login";
import Main from "./routes/main";

import Signup from "./routes/signup";
import PrivateRoute from "./PrivateRoute";

const AppTest = () => {
  const { isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <div>Loading</div>;
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Main />
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }
};

export default AppTest;
