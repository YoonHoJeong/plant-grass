import React from "react";
import styles from "./grass_item.module.css";

const GrassItem = ({ date, committed }) => (
  <li
    className={`${styles.grass} ${committed && styles.committed}`}
    data-date={date}
  ></li>
);

export default GrassItem;
