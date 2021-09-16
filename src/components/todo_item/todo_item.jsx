import { doc, getDoc, onSnapshot } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { DateContext } from "../../contexts/DateContext";
import { TodoContext } from "../../contexts/TodoContext";
import { fireStore } from "../../services/firebase";
import GrassItem from "../grass_item/grass_item";
import styles from "./todo_item.module.css";

const TodoItem = ({ todoTitle }) => {
  const [loading, setLoading] = useState(true);
  const { dates } = useContext(DateContext);
  const { deleteTodo } = useContext(TodoContext);
  const [todo, setTodo] = useState();

  useEffect(() => {
    initTodo();

    const unsub = onSnapshot(doc(fireStore, "todos", todoTitle), (doc) => {
      setLoading(true);
      console.log("data: ", doc.data());
      setTodo(doc.data());
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const initTodo = async () => {
    const docRef = doc(fireStore, "todos", todoTitle);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("initTodo", docSnap.data());
      setTodo(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    // setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
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
      )}
    </>
  );
};

export default TodoItem;
