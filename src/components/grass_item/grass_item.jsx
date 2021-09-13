import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "./grass_item.module.css";

const GrassItem = ({ date, todo, handleClickGrass }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {todo.commits[date] ? todo.commits[date].title : date}
    </Tooltip>
  );

  return (
    <li
      className={`${styles.grass} ${todo.commits[date] && styles.committed}`}
      data-date={date}
      onClick={() => {
        handleClickGrass(todo, date);
      }}
    >
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <button className={styles.grassBtn}></button>
      </OverlayTrigger>
    </li>
  );
};

export default GrassItem;
