import React from "react";
import styles from "./grass_item.module.css";

const GrassItem = ({ date, todo, updateGrass }) => (
  <li
    className={`${styles.grass} ${todo.commits[date] && styles.committed}`}
    data-date={date}
    onClick={() => {
      updateGrass(date, todo);
    }}
  ></li>
);

export default GrassItem;
