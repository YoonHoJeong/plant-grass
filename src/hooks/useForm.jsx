import React, { useState } from "react";

const useForm = ({ initialValues }) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    setValues((currentState) => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
  };

  return [values, handleChange];
};

export default useForm;
