import React, { useRef, useState } from "react";
import todoCardCss from "./todo_card.module.css";
import commonCss from "../../common.module.css";
import dbManager from "../../services/dbManager";
import { get28days } from "../../contexts/DateContext";
import CloseIcon from "@mui/icons-material/Close";

import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { red } from "@mui/material/colors";

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
  const colorInputRef = useRef();
  const handleColorClick = () => {
    colorInputRef.current.click();
  };
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
      dbManager.updateTodo(todo.id, titleRef.current.innerText);
    } else {
      // 수정 요청
      e.target.innerText = "done";
      titleRef.current.setAttribute("contenteditable", true);
    }
  };
  const commitDates = getCommitDates(todo);

  return (
    <Card sx={{ maxWidth: 345 }} className={styles.card}>
      <CardHeader
        avatar={
          <IconButton aria-label="colorIcon" onClick={handleColorClick}>
            <div
              className={styles.cardColorIcon}
              style={{ backgroundColor: todo.color ? todo.color : "#000000" }}
            >
              <input
                style={{ visibility: "hidden" }}
                ref={colorInputRef}
                type="color"
                id="colorpicker"
                onChange={(e) => {
                  dbManager.updateTodo(todo.id, { color: e.target.value });
                }}
                value={todo.color ? todo.color : "#000000"}
              />
            </div>
          </IconButton>
        }
        action={
          <IconButton aria-label="closeBtn">
            <CloseIcon onClick={handleClose} />
          </IconButton>
        }
        title={todo.title}
        subheader="2021/10/20"
      />

      <CardContent>
        <ul className={styles.grassContainer}>
          {get28days().map((date) => {
            return commitDates.has(date) ? (
              <Tooltip title={date}>
                <li
                  key={date}
                  style={{
                    backgroundColor: todo.color ? todo.color : "#000000",
                  }}
                  date={date}
                ></li>
              </Tooltip>
            ) : (
              <li key={date} date={date}></li>
            );
          })}
        </ul>
      </CardContent>
      <CardActions>
        <Button onClick={handleCommit} size="small">
          Commit
        </Button>
      </CardActions>
    </Card>
    // <li className={styles.todoCard}>

    //   <section>
    //     <div className={styles.todoTitle}>
    //       <div ref={titleRef} className={styles.cardTitle}>
    //         {todo.title}
    //       </div>
    //       <button className={styles.editBtn} onClick={handleEdit}>
    //         Edit
    //       </button>
    //     </div>
    //   </section>
    //   <section className={styles.records}>
    //     <div>
    //       <ul className={styles.grassContainer}>
    //         {get28days().map((date) => (
    //           <li
    //             key={date}
    //             className={commitDates.has(date) ? styles.commit : null}
    //             date={date}
    //           ></li>
    //         ))}
    //       </ul>
    //     </div>
    //   </section>
    //   <section>
    //     <button
    //       className={`${styles.btn} ${styles.commitBtn}`}
    //       onClick={handleCommit}
    //     >
    //       Commit Today!
    //     </button>
    //   </section>
    // </li>
  );
};

export default TodoCard;
