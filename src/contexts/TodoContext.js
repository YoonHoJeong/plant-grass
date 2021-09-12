import { createContext, useEffect, useState } from "react";
import StoreManager from "../services/storeManager";
import { getToday } from "./DateContext";

const storeManager = new StoreManager();

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([
    {
      title: "github",
      commits: {
        "2021-09-03": { title: "add form1", msg: "fix error1" },
        "2021-09-04": { title: "add form2", msg: "fix error2" },
        "2021-09-06": { title: "add form3", msg: "fix error3" },
      },
    },
  ]);

  useEffect(() => {
    storeManager.getAllTodos();
  }, []);

  const addTodo = async (todoTitle) => {
    const todo = await storeManager.addTodo(todoTitle);
    setTodos([...todos, todo]);
    // setTodos((currentState) => {
    //   const newTodo = { title: todoTitle, commits: {} };
    //   let id;
    //   if (currentState.length > 0) {
    //     id = currentState[currentState.length - 1].id + 1;
    //   } else {
    //     id = 1;
    //   }
    //   newTodo.id = id;

    //   return [...currentState, newTodo];
    // });
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

  const value = { todos, addTodo, deleteTodo, todoCommit };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
};

export default TodoContextProvider;
