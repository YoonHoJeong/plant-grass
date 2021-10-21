import React, { useEffect, useState } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import mainCss from "./main.module.css";
import commonCss from "../common.module.css";
import { useAuth } from "../hooks/useAuth";
import MainHeader from "../components/main_header";
import Dashboard from "../components/dashboard";
import usePopup from "../hooks/usePopup";
import dbManager from "../services/dbManager";
import Settings from "./settings";
import TodoDetail from "../components/todo_detail";

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

      <MainHeader todos={todos} />
      <Switch>
        <Route exact path={path}>
          <Dashboard todos={todos} showPopup={showActionPopup} />
        </Route>
        <Route path={`${path}settings`}>
          <Settings />
        </Route>
        <Route path={`${path}todo/:tid`}>
          <TodoDetail />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
