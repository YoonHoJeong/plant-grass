import React, { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";
import { TodoContext } from "../../contexts/TodoContext";
import GrassItem from "../grass_item/grass_item";
import styles from "./todo_item.module.css";

const TodoItem = ({ todo }) => {
  const { dates } = useContext(DateContext);
  const { deleteTodo } = useContext(TodoContext);

  return (
    <li>
      <div className={styles.todoName}>{todo.title}</div>
      <button
        onClick={() => {
          deleteTodo(todo);
        }}
      >
        delete
      </button>
      <ul className={styles.GrassMap}>
        {dates.map((date) => (
          <GrassItem key={date} date={date} todo={todo} />
        ))}
      </ul>
    </li>
  );
};

export default TodoItem;
