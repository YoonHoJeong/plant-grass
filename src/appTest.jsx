import React, { useEffect, useState } from "react";
import { ProvideAuth, useAuth } from "./hooks/useAuth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./login";
import Main from "./routes/main";

import Signup from "./signup";

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  console.log("private route", auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

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
          <PrivateRoute path="/">
            <Main />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default AppTest;
