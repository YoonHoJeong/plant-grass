import React, { useEffect, useState } from "react";

import appCss from "../app.module.css";
import commonCss from "../common.module.css";
import SideBar from "../components/sideBar/sideBar";
import { useAuth } from "../hooks/useAuth";
import MainHeader from "../components/main_header";
import Dashboard from "../components/dashboard";
import usePopup from "../hooks/usePopup";
import dbManager from "../services/dbManager";

let styles = {};
Object.assign(styles, appCss, commonCss);

const Main = () => {
  const auth = useAuth();
  const [todos, setTodos] = useState([]);
  const [popup, showActionPopup] = usePopup();

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
    <>
      {popup}
      <div className={styles.appContainer}>
        <SideBar />
        <main className={styles.appMain}>
          <div className={styles.pageContainer}>
            <MainHeader todos={todos} />
            <Dashboard todos={todos} showPopup={showActionPopup} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
