import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

const AddTodoForm = () => {
  const [input, setInput] = useState("");
  const { addTodo } = useContext(TodoContext);

  return (
    <>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="enter your todo"
      />
      <button
        onClick={() => {
          addTodo(input);
        }}
      >
        submit
      </button>
    </>
  );
};

export default AddTodoForm;
