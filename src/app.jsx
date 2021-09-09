import { useEffect, useState } from "react";
import GrassTab from "./components/grass_tab";
import styles from "./app.module.css";
import AddTodoForm from "./components/add_todo_form";

function leftPad(value) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

const dateToString = (date) => {
  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());
  return [year, month, day].join("-");
};

function App() {
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

  const [dates, setDates] = useState([]);
  useEffect(() => {
    const today = new Date();

    const newDates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime());
      date.setDate(date.getDate() - i);
      newDates.push(dateToString(date));
    }
    setDates(newDates);
  }, []);

  const addTodo = (todoTitle) => {
    console.log(todoTitle);
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

  const updateGrass = (grassDate, todo) => {
    const today = dates[dates.length - 1];
    if (grassDate === today) {
      console.log("able", grassDate);
      setTodos((currentState) =>
        currentState.map((item) => {
          if (item.id !== todo.id) {
            return item;
          } else {
            const newTodo = {
              ...todo,
              commits: { ...todo.commits },
            };
            newTodo.commits[grassDate] = true;

            console.log(newTodo);
            return newTodo;
          }
        })
      );
    } else {
      console.log("disable");
    }
  };

  return (
    <div>
      <header>Header</header>
      <AddTodoForm addTodo={addTodo} />
      <ul className={styles.grassList}>
        {todos.map((todo) => (
          <GrassTab
            key={todo.id}
            todo={todo}
            dates={dates}
            deleteTodo={deleteTodo}
            updateGrass={updateGrass}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
