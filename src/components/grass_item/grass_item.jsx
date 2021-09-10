import React, { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import styles from "./grass_item.module.css";

const GrassItem = ({ date, todo }) => {
  const { todoCommit } = useContext(TodoContext);

  return (
    <li
      className={`${styles.grass} ${todo.commits[date] && styles.committed}`}
      data-date={date}
      onClick={() => {
        todoCommit(date, todo);
      }}
    ></li>
  );
};

export default GrassItem;
