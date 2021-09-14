import React, { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";
import { TodoContext } from "../../contexts/TodoContext";
import { usePopup } from "../../hooks/usePopupForm";
import GrassItem from "../grass_item/grass_item";
import styles from "./todo_item.module.css";

const TodoItem = ({ todo, handleClickGrass }) => {
  const { dates } = useContext(DateContext);
  const { deleteTodo } = useContext(TodoContext);

  const [popup] = usePopup(todo);

  return (
    <>
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
            <GrassItem
              key={date}
              date={date}
              todo={todo}
              handleClickGrass={handleClickGrass}
            />
          ))}
        </ul>
      </li>
      {popup}
    </>
  );
};

export default TodoItem;
