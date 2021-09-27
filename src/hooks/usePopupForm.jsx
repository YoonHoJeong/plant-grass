import { useState } from "react";
import Popup from "../components/popup";
import { getToday } from "../contexts/DateContext";

export const usePopup = (todo) => {
  const [commit, setCommit] = useState({ title: "", content: "" });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleCommit = () => {
    console.log("fake commit");
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
      popupData={{ todo, today: getToday() }}
    />,
    () => {
      setShow(true);
    },
    () => {
      setShow(false);
    },
  ];
};
