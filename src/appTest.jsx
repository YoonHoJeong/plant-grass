import React, { useState } from "react";
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
import useActionPopup from "./hooks/useActionPopup";
import PrivateRoute from "./PrivateRoute";

const AppTest = () => {
  const [popup, showActionPopup, hideActionPopup] = useActionPopup();

  return (
    <ProvideAuth>
      {popup}
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Main showActionPopup={showActionPopup} />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default AppTest;
