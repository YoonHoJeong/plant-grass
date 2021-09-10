import { createContext, useEffect, useState } from "react";

export const getToday = () => {
  return dateToString(new Date());
};
export const DateContext = createContext();

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

const DateContextProvider = (props) => {
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

  const value = { dates, getToday };

  return (
    <DateContext.Provider value={value}>{props.children}</DateContext.Provider>
  );
};

export default DateContextProvider;
