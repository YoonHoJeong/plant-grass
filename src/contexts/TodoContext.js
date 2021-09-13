import { createContext, useEffect, useState } from "react";
import StoreManager from "../services/storeManager";
import useLoader from "../useLoader";
import { getToday } from "./DateContext";

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
    console.log("syncTodos done");
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

  const todoCommit = (todo, commitMsg) => {
    storeManager.addTodo();

    // today일 때만 호출
    const today = getToday();

    setTodos((currentState) =>
      currentState.map((item) => {
        if (item.id === todo.id) {
          const newItem = { ...item };
          newItem.commits[today] = commitMsg;
          return newItem;
        } else {
          return item;
        }
      })
    );
  };

  const value = { todos, addTodo, deleteTodo, todoCommit, loader };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
};

export default TodoContextProvider;
