import { useEffect, useState } from "react";
import TodoList from "./components/todoList";
import Calendar from "./components/calendar";
import TodoItem from "./components/todoItem";

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
      title: "깃허브 커밋하기",
      commits: {
        "2021-09-03": true,
        "2021-09-04": true,
        "2021-09-06": true,
        "2021-09-09": true,
      },
    },
  ]);

  const [dates, setDates] = useState([]);
  useEffect(() => {
    const today = new Date();

    const newDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime());
      date.setDate(date.getDate() - i);
      newDates.push(date);
    }
    setDates(newDates);
  }, []);

  return (
    <div>
      <header>Header</header>
      <ul>
        {dates.map((date) => (
          <li data-date={dateToString(date)}></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
