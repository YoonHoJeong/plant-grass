import React, { useState } from "react";
import dashboardCss from "./dashboard.module.css";
import commonCss from "../../common.module.css";
import TodoCard from "../todo_card";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

let styles = {};

Object.assign(styles, dashboardCss, commonCss);

const useActionPopup = () => {
  const [show, setShow] = useState(false);
  const [actionTitle, setActionTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("actionTitle: ", actionTitle);
    setShow(false);
  };

  return [
    show ? (
      <div className={`${styles.popupBG} ${!show && styles.hide}`}>
        <form className={styles.popupForm} onSubmit={handleSubmit}>
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
            type="submit"
            disabled={false}
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
const Dashboard = ({ todos }) => {
  const [popup, showPopup] = useActionPopup();

  const handleClickAction = (e) => {
    showPopup();
  };

  return (
    <div className={styles.dashboard}>
      <button
        className={`${styles.btn} ${styles.addActionBtn}`}
        onClick={handleClickAction}
      >
        Add Action
      </button>
      {popup}
      <ul className={styles.todoCards}>
        <TodoCard />
      </ul>
    </div>
  );
};

export default Dashboard;
