import React, { useState } from "react";

const AddTodoForm = ({ addTodo }) => {
  const [input, setInput] = useState(null);
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
