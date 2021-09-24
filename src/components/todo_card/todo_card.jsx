import React from "react";
import todoCardCss from "./todo_card.module.css";
import commonCss from "../../common.module.css";

let styles = {};

Object.assign(styles, todoCardCss, commonCss);

const TodoCard = (props) => (
  <li className={styles.todoCard}>
    <button className={`${styles.btn} ${styles.closeBtn}`}></button>
    <section>
      <header className={styles.indexText}>TODO NAME</header>
      <div className={styles.todoTitle}>
        <h2 className={styles.lgFont}>Github</h2>
        <a className={styles.editBtn}>Edit</a>
      </div>
    </section>
    <section className={styles.records}>
      <div>
        <div className={styles.indexText}>RECORDS</div>
        <ul className={styles.grassContainer}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>

          <li></li>
        </ul>
      </div>
      <div className={styles.bestRecord}>
        <div className={styles.indexText}>BEST RECORD</div>
        <div className={styles.bestRecordStat}>100 days</div>
      </div>
    </section>
    <section>
      <button className={`${styles.btn} ${styles.commitBtn}`}>
        Commit Today!
      </button>
    </section>
  </li>
);

export default TodoCard;
