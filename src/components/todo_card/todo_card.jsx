import React from "react";
import todoCardCss from "./todo_card.module.css";
import commonCss from "../../common.module.css";
import dbManager from "../../services/dbManager";
import { get28days } from "../../contexts/DateContext";

let styles = {};

Object.assign(styles, todoCardCss, commonCss);

const TodoCard = ({ todo, showPopup }) => {
  const handleCommit = (e) => {
    showPopup("commit", todo);
  };
  const handleClose = (e) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dbManager.deleteTodo(todo.id);
    }
  };
  return (
    <li className={styles.todoCard}>
      <button
        className={`${styles.btn} ${styles.closeBtn}`}
        onClick={handleClose}
      >
        close
      </button>
      <section>
        <header className={styles.indexText}>TODO NAME</header>
        <div className={styles.todoTitle}>
          <h2 className={styles.lgFont}>{todo.title}</h2>
          <a className={styles.editBtn}>Edit</a>
        </div>
      </section>
      <section className={styles.records}>
        <div>
          <div className={styles.indexText}>RECORDS</div>
          <ul className={styles.grassContainer}>
            {get28days().map((date) => (
              <li date={date}></li>
            ))}
          </ul>
        </div>
        <div className={styles.bestRecord}>
          <div className={styles.indexText}>BEST RECORD</div>
          <div className={styles.bestRecordStat}>100 days</div>
        </div>
      </section>
      <section>
        <button
          className={`${styles.btn} ${styles.commitBtn}`}
          onClick={handleCommit}
        >
          Commit Today!
        </button>
      </section>
    </li>
  );
};

export default TodoCard;
