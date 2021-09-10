import { createContext, useContext, useState } from "react";
import { DateContext, getToday } from "./DateContext";

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "github",
      commits: {
        "2021-09-03": true,
        "2021-09-04": true,
        "2021-09-06": true,
      },
    },
  ]);

  const addTodo = (todoTitle) => {
    setTodos((currentState) => {
      const newTodo = { title: todoTitle, commits: {} };
      let id;
      if (currentState.length > 0) {
        id = currentState[currentState.length - 1].id + 1;
      } else {
        id = 1;
      }
      newTodo.id = id;

      return [...currentState, newTodo];
    });
  };

  const deleteTodo = (todo) => {
    setTodos((currentState) =>
      currentState.filter((item) => item.id !== todo.id)
    );
  };

  const todoCommit = (grassDate, todo) => {
    const today = getToday();

    if (grassDate === today) {
      console.log("able");
      setTodos((currentState) =>
        currentState.map((item) => {
          if (item.id === todo.id) {
            const newItem = { ...item };
            newItem.commits[today] = true;
            return newItem;
          } else {
            return item;
          }
        })
      );
    } else {
      console.log("disable");
    }
  };

  const value = { todos, addTodo, deleteTodo, todoCommit };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
};

export default TodoContextProvider;
