import React, { useState } from "react";
import styles from "../common.module.css";
import { getDatabase, ref, push, child, update } from "firebase/database";
import firebaseApp from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

const writeNewTodo = (uid, title) => {
  const db = getDatabase(firebaseApp);

  const todoData = {
    uid: uid,
    title: title,
    commits: {},
  };

  // Get a key for a new post.
  const newTodoKey = push(child(ref(db), "todos")).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/todos/" + newTodoKey] = todoData;
  updates["/user-todos/" + uid + "/" + newTodoKey] = todoData;

  return update(ref(db), updates);
};

const useActionPopup = () => {
  const [show, setShow] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("actionTitle: ", actionTitle);
    writeNewTodo(auth.user?.uid, actionTitle);

    setActionTitle("");
    setShow(false);
  };

  return [
    show ? (
      <div className={`${styles.popupBG} ${!show && styles.hide}`}>
        <form className={styles.popupForm} onSubmit={handleSubmit}>
          <button
            className={styles.closeBtn}
            onClick={(e) => {
              e.preventDefault();
              setShow(false);
            }}
          >
            close
          </button>
          <input
            className={styles.textInput}
            type="text"
            name="actionTitle"
            placeholder="Enter the action title"
            value={actionTitle}
            onChange={(e) => {
              setActionTitle(e.target.value);
            }}
          />

          <button
            className={`${styles.btn} ${styles.loginBtn}`}
            onClick={handleSubmit}
          >
            Add Action
          </button>
        </form>
      </div>
    ) : null,
    () => setShow(true),
    () => setShow(false),
  ];
};

export default useActionPopup;
