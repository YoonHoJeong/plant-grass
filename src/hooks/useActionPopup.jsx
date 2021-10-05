import React, { useState } from "react";
import styles from "../common.module.css";
import dbManager from "../services/dbManager";

const getPlaceholders = (type) => {
  let placeholders = false;
  if (type === "todo" || type === "commit") {
    placeholders = {
      title: `Enter the ${type} title`,
      content: `Enter ${type} content`,
    };
  }
  return placeholders;
};

const useActionPopup = (type = "todo") => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({ title: "", content: "" });
  const [placeholders, setPlaceholders] = useState(getPlaceholders(type));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("title:", values.title);

    switch (type) {
      case "todo":
        dbManager.writeNewTodo(values.title);
        break;
      case "commit":
        dbManager.writeNewCommit(values);
      default:
        break;
    }

    setValues({ title: "", content: "" });
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
            name="title"
            placeholder={placeholders.title}
            autoComplete="off"
            value={values.title}
            onChange={(e) => {
              setValues((currentValues) => ({
                ...currentValues,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          {type === "commit" && (
            <textarea
              className={styles.textarea}
              placeholder={placeholders.content}
            />
          )}

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
