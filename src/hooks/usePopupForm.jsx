import { useContext, useState } from "react";
import Popup from "../components/popup.jsx/popup";
import { getToday } from "../contexts/DateContext";
import { TodoContext } from "../contexts/TodoContext";

export const usePopup = (todo, date = getToday()) => {
  const { todoCommit } = useContext(TodoContext);

  const [commit, setCommit] = useState({ title: "", content: "" });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleCommit = () => {
    todoCommit(todo, { [date]: commit });
    setShow(false);
  };

  const handleChange = (e) => {
    setCommit((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  return [
    <Popup
      show={show}
      handleClose={handleClose}
      handleChange={handleChange}
      handleCommit={handleCommit}
      popupData={{ todo, today: date }}
    />,
    () => {
      setShow(true);
    },
    () => {
      setShow(false);
    },
  ];
};
