import React, { useRef } from "react";
import todoCardCss from "./todo_card.module.css";
import commonCss from "../../common.module.css";
import dbManager from "../../services/dbManager";
import { get28days } from "../../contexts/DateContext";
import CloseIcon from "@mui/icons-material/Close";

let styles = {};

Object.assign(styles, todoCardCss, commonCss);

const getCommitDates = (todo) => {
  let dates = new Set();
  const commits = todo.commits || {};

  Object.keys(commits).forEach((cId) => {
    dates.add(commits[cId].date);
  });

  return dates;
};

const TodoCard = ({ todo, showPopup }) => {
  const titleRef = useRef();

  const handleCommit = (e) => {
    showPopup("commit", todo);
  };
  const handleClose = (e) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dbManager.deleteTodo(todo.id);
    }
  };
  const handleEdit = (e) => {
    const editable = titleRef.current.getAttribute("contenteditable");

    if (editable === "true") {
      // 수정 완료
      e.target.innerText = "edit";
      titleRef.current.setAttribute("contenteditable", false);
      dbManager.updateTodoTitle(todo.id, titleRef.current.innerText);
    } else {
      // 수정 요청
      e.target.innerText = "done";
      titleRef.current.setAttribute("contenteditable", true);
    }
  };
  const commitDates = getCommitDates(todo);

  return (
    <li className={styles.todoCard}>
      <button className={`${styles.closeIcon}`} onClick={handleClose}>
        <CloseIcon />
      </button>
      <section>
        <div className={styles.todoTitle}>
          <div ref={titleRef} className={styles.cardTitle}>
            {todo.title}
          </div>
          <button className={styles.editBtn} onClick={handleEdit}>
            Edit
          </button>
        </div>
      </section>
      <section className={styles.records}>
        <div>
          <ul className={styles.grassContainer}>
            {get28days().map((date) => (
              <li
                key={date}
                className={commitDates.has(date) ? styles.commit : null}
                date={date}
              ></li>
            ))}
          </ul>
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
