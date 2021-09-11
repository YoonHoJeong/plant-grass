import { useState } from "react";

export const usePopupForm = () => {
  const [values, setValues] = useState({ title: "", content: "" });

  const handleFormChange = (e) => {
    setValues((currentMsg) => ({
      ...currentMsg,
      [e.target.name]: e.target.value,
    }));
  };

  return [values, handleFormChange];
};
