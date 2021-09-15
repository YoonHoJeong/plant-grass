import React, { useContext, useState } from "react";
import TodoItem from "../todo_item/todo_item";
import { TodoContext } from "../../contexts/TodoContext";
import styles from "./todo_list.module.css";
import Popup from "../popup.jsx/popup";
import { getToday } from "../../contexts/DateContext";

const TodoList = () => {
  const { todos, loader } = useContext(TodoContext);

  return (
    <>
      {loader ? (
        loader
      ) : (
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <TodoItem key={todo.title} todoTitle={todo.title} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
