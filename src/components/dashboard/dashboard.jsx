import React from "react";
import dashboardCss from "./dashboard.module.css";
import commonCss from "../../common.module.css";
import TodoCard from "../todo_card";
import { usePopup } from "../../hooks/usePopupForm";

let styles = {};

Object.assign(styles, dashboardCss, commonCss);

const Dashboard = ({ todos }) => {
  // const [popup, showPopup] = usePopup();

  const handleClickAction = (e) => {
    // showPopup();
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
        <TodoCard />
      </ul>
    </div>
  );
};

export default Dashboard;
