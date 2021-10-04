import { createContext, useEffect, useState } from "react";
import StoreManager from "../services/storeManager";
import useLoader from "../hooks/useLoader";
import { fireStore } from "../services/firebase";
import { deleteDoc, doc } from "@firebase/firestore";

const storeManager = new StoreManager();

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState();
  const [loader, showLoader, hideLoader] = useLoader(); //initialize useLoader hook

  useEffect(() => {
    syncTodos();
  }, [syncTodos]);

  const syncTodos = async () => {
    const loadTodos = await storeManager.loadTodos();
    setTodos(loadTodos);
    hideLoader();
  };

  const addTodo = async (todoTitle) => {
    showLoader();
    const todo = await storeManager.addTodo(todoTitle);
    setTodos([...todos, todo]);
    hideLoader();
  };

  const deleteTodo = async (todo) => {
    // setTodos((currentState) =>
    //   currentState.filter((item) => item.id !== todo.id)
    // );
    showLoader();

    await deleteDoc(doc(fireStore, "todos", todo.title));
    hideLoader();
  };

  const todoCommit = async (todo, commit) => {
    showLoader();
    await storeManager.commit(todo, commit);
    hideLoader();
  };

  const value = { todos, addTodo, deleteTodo, todoCommit, loader };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
};

export default TodoContextProvider;
