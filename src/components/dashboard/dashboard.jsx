import React from "react";
import dashboardCss from "./dashboard.module.css";
import commonCss from "../../common.module.css";
import TodoCard from "../todo_card";

let styles = {};

Object.assign(styles, dashboardCss, commonCss);

const Dashboard = ({ todos, showPopup }) => {
  const handleClickAction = (e) => {
    showPopup("todo");
  };

  return (
    <div className={styles.dashboard}>
      <button
        className={`${styles.btn} ${styles.addActionBtn}`}
        onClick={handleClickAction}
      >
        Add Action
      </button>
      <ul className={styles.todoCards}>
        {Object.keys(todos || {}).map((key) => {
          return (
            <TodoCard
              key={todos[key].id}
              todo={todos[key]}
              showPopup={showPopup}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
