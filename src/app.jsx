import { useEffect, useState } from "react";
import GrassTab from "./components/grass_tab";

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
      newDates.push(dateToString(date));
    }
    setDates(newDates);
  }, []);

  return (
    <div>
      <header>Header</header>

      <GrassTab todo={todos[0]} dates={dates} />
    </div>
  );
}

export default App;
