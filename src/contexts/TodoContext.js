import { createContext, useEffect, useState } from "react";
import StoreManager from "../services/storeManager";
import useLoader from "../hooks/useLoader";
import { getToday } from "./DateContext";
import { collection, onSnapshot, query, where } from "@firebase/firestore";

const storeManager = new StoreManager();

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState();
  const [loader, showLoader, hideLoader] = useLoader(); //initialize useLoader hook

  useEffect(() => {
    syncTodos();
  }, []);

  const syncTodos = async () => {
    const loadTodos = await storeManager.loadTodos();
    setTodos(loadTodos);
    hideLoader();
  };

  const addTodo = async (todoTitle) => {
    const todo = await storeManager.addTodo(todoTitle);
    setTodos([...todos, todo]);
  };

  const deleteTodo = (todo) => {
    setTodos((currentState) =>
      currentState.filter((item) => item.id !== todo.id)
    );
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
