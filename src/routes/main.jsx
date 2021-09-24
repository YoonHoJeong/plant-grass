import React, { useEffect, useState } from "react";

import appCss from "../appTest.module.css";
import commonCss from "../common.module.css";
import SideBar from "../components/sideBar/sideBar";
import { useAuth } from "../hooks/useAuth";
import useLoader from "../hooks/useLoader";
import MainHeader from "../components/main_header";
import { getDatabase, ref, onValue } from "firebase/database";
import Dashboard from "../components/dashboard";

let styles = {};
Object.assign(styles, appCss, commonCss);

const Main = (props) => {
  let auth = useAuth();
  let [loader, showLoader, hideLoader] = useLoader();
  const [todos, setTodos] = useState([]);

  const getTodosById = async (uid) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}/todos`);
    onValue(userRef, (snapshot) => {
      // users/uid/todos : array[todo_id]
      const todoIds = snapshot.val() || [];
      console.log("todoIds", todoIds);
      const todosDB = [];
      todoIds.forEach((tid) => {
        onValue(ref(db, "todos/" + tid), (snapshot) => {
          todosDB.push(snapshot.val());
        });
      });
      console.log("todosDB", todosDB);

      setTodos(todosDB);
    });
  };
  useEffect(() => {
    hideLoader();

    getTodosById(auth.user.uid);

    return () => {
      showLoader();
    };
  }, []);
  return loader ? (
    loader
  ) : (
    <div className={styles.appContainer}>
      <SideBar />
      <main className={styles.appMain}>
        <div className={styles.pageContainer}>
          <MainHeader auth={auth} todos={todos} />
          <Dashboard todos={todos} />
        </div>
      </main>
    </div>
  );
};

export default Main;
