import React from "react";
import { useAuth } from "./hooks/useAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./routes/login";
import Main from "./routes/main";
import Signup from "./routes/signup";
import PrivateRoute from "./PrivateRoute";

import styles from "./app.module.css";
import SideBar from "./components/sideBar/sideBar";

const App = () => {
  const { isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <div>Loading</div>;
  } else {
    return (
      <div className={styles.app}>
        <Router>
          <SideBar />

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
      </div>
    );
  }
};

export default App;
