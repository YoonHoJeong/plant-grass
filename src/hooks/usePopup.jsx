import React, { useState } from "react";
import commonStyles from "../common.module.css";
import popupStyles from "./popup.module.css";
import dbManager from "../services/dbManager";

let styles = {};
Object.assign(styles, commonStyles, popupStyles);

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

const usePopup = () => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({ title: "", content: "" });
  const [type, setType] = useState("");
  const [todo, setTodo] = useState(false); // to use commit
  const placeholders = getPlaceholders(type);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("title:", values.title);

    switch (type) {
      case "todo":
        dbManager.writeNewTodo(values.title);
        break;
      case "commit":
        if (todo) {
          dbManager.writeNewCommit(todo.id, values);
        } else {
          console.log(handleSubmit, "todo is empty");
        }
        break;
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
          <header className={styles.popupHeader}>
            {todo?.title}
            <button
              className={`${styles.btn} ${styles.closeBtn}`}
              onClick={(e) => {
                e.preventDefault();
                setShow(false);
              }}
            >
              close
            </button>
          </header>
          <input
            className={styles.textInput}
            type="text"
            name="title"
            placeholder={placeholders.title}
            autoComplete="off"
            value={values.title}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            onChange={(e) => {
              setValues((currentValues) => ({
                ...currentValues,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          {type === "commit" && (
            <textarea
              name="content"
              className={styles.textarea}
              placeholder={placeholders.content}
              onChange={(e) => {
                setValues((currentValues) => ({
                  ...currentValues,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          )}

          <button
            className={`${styles.btn} ${styles.loginBtn}`}
            onClick={handleSubmit}
          >
            {`Add ${type}`}
          </button>
        </form>
      </div>
    ) : null,
    (type, todo) => {
      setTodo(todo);
      setType(type);
      setShow(true);
    },
    () => setShow(false),
  ];
};

export default usePopup;
