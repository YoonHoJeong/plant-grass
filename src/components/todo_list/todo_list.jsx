import React, { useContext, useState } from "react";
import TodoItem from "../todo_item/todo_item";
import { TodoContext } from "../../contexts/TodoContext";
import styles from "./todo_list.module.css";
import Popup from "../modals/popup";
import { getToday } from "../../contexts/DateContext";
import { usePopupForm } from "../../usePopupForm";

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  const { todoCommit } = useContext(TodoContext);

  const [popupShow, setPopupShow] = useState(false);
  const [popupData, setPopupData] = useState({
    todo: {},
    date: getToday(),
  });
  const [commitMsg, handleFormChange] = usePopupForm();

  const handleClose = () => setPopupShow(false);
  const handleCommit = () => {
    todoCommit(popupData.todo, commitMsg);
    setPopupShow(false);
  };

  const handleClickGrass = (todo, grassDate) => {
    const today = getToday();
    if (today === grassDate) {
      // 클릭한 grass가 오늘일 때, 팝업창 띄움
      setPopupData({ ...popupData, todo, today });
      setPopupShow(true);
    } else {
      console.log("disable");
    }
  };
  return (
    <>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleClickGrass={handleClickGrass}
          />
        ))}
      </ul>
      <Popup
        show={popupShow}
        handleClose={handleClose}
        handleCommit={handleCommit}
        popupData={popupData}
        handleFormChange={handleFormChange}
      />
    </>
  );
};

export default TodoList;
