import React from "react";
import dashboardCss from "./dashboard.module.css";
import commonCss from "../../common.module.css";
import TodoCard from "../todo_card";
import Button from "@mui/material/Button";

let styles = {};

Object.assign(styles, dashboardCss, commonCss);

const Dashboard = ({ todos, showPopup }) => {
  const handleClickAction = (e) => {
    showPopup("todo");
  };

  return (
    <div className={styles.dashboard}>
      <Button
        variant="contained"
        className={`${styles.addActionBtn}`}
        onClick={handleClickAction}
      >
        Add Action
      </Button>
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
