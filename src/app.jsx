import AddTodoForm from "./components/add_todo_form";
import TodoList from "./components/todo_list";

import DateContextProvider from "./contexts/DateContext";
import TodoContextProvider from "./contexts/TodoContext";

function App() {
  return (
    <div>
      <TodoContextProvider>
        <DateContextProvider>
          <AddTodoForm />
          <TodoList />
        </DateContextProvider>
      </TodoContextProvider>
    </div>
  );
}

export default App;
