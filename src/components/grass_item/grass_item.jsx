import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { getToday } from "../../contexts/DateContext";
import { usePopup } from "../../hooks/usePopupForm";
import styles from "./grass_item.module.css";

const GrassItem = ({ date, todo }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {todo.commits[date] ? todo.commits[date].title : date}
    </Tooltip>
  );

  const [popup, showPopup] = usePopup(todo);

  const handleClickGrass = () => {
    if (date === getToday()) {
      showPopup();
    } else {
      alert("not today");
    }
  };

  return (
    <>
      <li
        className={`${styles.grass} ${todo.commits[date] && styles.committed}`}
        data-date={date}
        onClick={handleClickGrass}
      >
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button className={styles.grassBtn}></button>
        </OverlayTrigger>
      </li>
      {popup}
    </>
  );
};

export default GrassItem;
