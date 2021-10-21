import React, { useState } from "react";
import commonStyles from "../common.module.css";
import popupStyles from "./popup.module.css";
import dbManager from "../services/dbManager";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

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

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          <IconButton className={styles.closeIcon} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <header className={styles.popupHeader}>{todo?.title}</header>
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
          <section className={styles.footer}>
            <Button
              variant="contained"
              color="success"
              className={`${styles.addBtn}`}
              onClick={handleSubmit}
            >
              {`Add ${type}`}
            </Button>
            <Button
              color="success"
              className={`${styles.closeBtn}`}
              onClick={handleClose}
            >
              close
            </Button>
          </section>
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
