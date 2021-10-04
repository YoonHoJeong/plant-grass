import React, { useEffect, useState } from "react";

import appCss from "../appTest.module.css";
import commonCss from "../common.module.css";
import SideBar from "../components/sideBar/sideBar";
import { useAuth } from "../hooks/useAuth";
import MainHeader from "../components/main_header";
import Dashboard from "../components/dashboard";
import { useHistory } from "react-router";
import useActionPopup from "../hooks/useActionPopup";
import dbManager from "../services/dbManager";

let styles = {};
Object.assign(styles, appCss, commonCss);

const Main = () => {
  const history = useHistory();
  const auth = useAuth();
  const [todos, setTodos] = useState([]);
  const [popup, showActionPopup] = useActionPopup();

  useEffect(() => {
    if (!auth.user) {
      // login 되지 않은 경우
      history.push("/login");
    } else {
      // auth.user is not null
    }
  }, [auth, history]);

  useEffect(() => {
    setTodos(dbManager.getTodos());
  }, [dbManager.todos]);

  return (
    <>
      {popup}
      <div className={styles.appContainer}>
        <SideBar />
        <main className={styles.appMain}>
          <div className={styles.pageContainer}>
            <MainHeader todos={todos} />
            <Dashboard todos={todos} showActionPopup={showActionPopup} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
