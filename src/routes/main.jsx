import React, { useEffect, useState } from "react";

import appCss from "../appTest.module.css";
import commonCss from "../common.module.css";
import SideBar from "../components/sideBar/sideBar";
import { useAuth } from "../hooks/useAuth";
import MainHeader from "../components/main_header";
import {
  getDatabase,
  ref,
  onValue,
  push,
  child,
  update,
  set,
} from "firebase/database";
import Dashboard from "../components/dashboard";
import { useHistory } from "react-router";

let styles = {};
Object.assign(styles, appCss, commonCss);

const Main = (props) => {
  // const historyState = useHistory().state;
  const auth = useAuth();
  // const [userId, setUserId] = useState(historyState && historyState.id);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodosById(auth.user.uid);
    console.log(auth);
  }, [auth]);

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

  const addTodo = (todoData) => {
    // update todoRef
    // update userRef
    const {
      user: { uid },
    } = auth;

    const db = getDatabase();
    const userTodoListRef = ref(db, `users/${uid}/todos`);

    const newTodoKey = push(child(ref(db), "posts")).key;
    const newUserTodoRef = push(userTodoListRef);

    // push todo key into user/uid/todos
    set(newUserTodoRef, newTodoKey);

    // update todos Ref
    const updates = {};
    updates[`/todos/` + newTodoKey] = todoData;
    update(ref(db), updates);
  };

  return (
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
