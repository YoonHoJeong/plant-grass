import React from "react";
import styles from "./grass_item.module.css";

const GrassItem = ({ date, todo, handleClickGrass }) => {
  return (
    <li
      className={`${styles.grass} ${todo.commits[date] && styles.committed}`}
      data-date={date}
      onClick={() => {
        handleClickGrass(todo, date);
      }}
    ></li>
  );
};

export default GrassItem;
