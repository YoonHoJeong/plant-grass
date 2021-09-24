import React from "react";
import dashboardCss from "./dashboard.module.css";
import commonCss from "../../common.module.css";
import TodoCard from "../todo_card";

let styles = {};

Object.assign(styles, dashboardCss, commonCss);

const Dashboard = ({ todos }) => {
  return (
    <div className={styles.dashboard}>
      <button className={`${styles.btn} ${styles.addActionBtn}`}>
        Add Action
      </button>
      <ul className={styles.todoCards}>
        <TodoCard />
      </ul>
    </div>
  );
};

export default Dashboard;
