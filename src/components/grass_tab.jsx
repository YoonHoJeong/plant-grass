import React, { useEffect } from "react";
import GrassItem from "./grass_item";
import styles from "./grass_tab.module.css";

const GrassTab = ({ todo, dates, deleteTodo, updateGrass }) => {
  return (
    <li>
      <div className={styles.todoName}>{todo.title}</div>
      <button
        onClick={() => {
          deleteTodo(todo);
        }}
      >
        delete
      </button>
      <ul className={styles.grassTab}>
        {dates.map((date) => (
          <GrassItem
            key={date}
            date={date}
            todo={todo}
            updateGrass={updateGrass}
          />
        ))}
      </ul>
    </li>
  );
};

export default GrassTab;
