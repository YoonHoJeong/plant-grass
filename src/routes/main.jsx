import React, { useEffect, useState } from "react";

import appCss from "../appTest.module.css";
import commonCss from "../common.module.css";
import SideBar from "../components/sideBar/sideBar";
import { useAuth } from "../hooks/useAuth";
import MainHeader from "../components/main_header";
import { getDatabase, ref, onValue } from "firebase/database";
import Dashboard from "../components/dashboard";
import { useHistory } from "react-router";
import useActionPopup from "../hooks/useActionPopup";

let styles = {};
Object.assign(styles, appCss, commonCss);

const Main = () => {
  const history = useHistory();
  const auth = useAuth();
  const [todos, setTodos] = useState([]);
  const [popup, showActionPopup] = useActionPopup();

  useEffect(() => {
    getTodosById(auth.user?.uid);

    if (auth === null || auth === undefined) {
      history.push("/login");
    }
  }, [auth, history]);

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
