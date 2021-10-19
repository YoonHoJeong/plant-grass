import React, { useEffect, useState } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import mainCss from "./main.module.css";
import commonCss from "../common.module.css";
import { useAuth } from "../hooks/useAuth";
import MainHeader from "../components/main_header";
import Dashboard from "../components/dashboard";
import usePopup from "../hooks/usePopup";
import dbManager from "../services/dbManager";
import SideBar from "../components/sideBar/sideBar";
import Settings from "./settings";

let styles = {};
Object.assign(styles, mainCss, commonCss);

const Main = () => {
  const auth = useAuth();
  const [todos, setTodos] = useState([]);
  const [popup, showActionPopup] = usePopup();
  let { path, url } = useRouteMatch();

  useEffect(() => {
    if (!auth.user) {
      return;
    }
    const stopSync = dbManager.syncTodos((todos) => {
      setTodos(todos);
    });

    return () => stopSync();
  }, [auth.user]);

  return (
    <div className={styles.main}>
      {popup}
      <SideBar />

      <Switch>
        <Route exact path={path}>
          <div className={styles.appContainer}>
            <main className={styles.appMain}>
              <div className={styles.pageContainer}>
                <MainHeader todos={todos} />
                <Dashboard todos={todos} showPopup={showActionPopup} />
              </div>
            </main>
          </div>
        </Route>
        <Route path={`${path}settings`}>
          <Settings />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
