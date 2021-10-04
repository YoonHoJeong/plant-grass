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

export const get28days = () => {
  const today = new Date();

  const newDates = [];
  for (let i = 27; i >= 0; i--) {
    const date = new Date(today.getTime());
    date.setDate(date.getDate() - i);
    newDates.push(dateToString(date));
  }
  return newDates;
};

export const getToday = () => {
  return dateToString(new Date());
};
