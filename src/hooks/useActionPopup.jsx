import React, { useState } from "react";
import styles from "../common.module.css";
import { useAuth } from "../hooks/useAuth";
import dbManager from "../services/dbManager";

const useActionPopup = () => {
  const [show, setShow] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("actionTitle: ", actionTitle);
    dbManager.writeNewTodo(actionTitle);

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
