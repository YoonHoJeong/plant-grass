import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddTodoForm from "./components/add_todo_form";
import Popup from "./components/modals/popup";
import TodoList from "./components/todo_list";

import DateContextProvider from "./contexts/DateContext";
import TodoContextProvider from "./contexts/TodoContext";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <TodoContextProvider>
        <DateContextProvider>
          <AddTodoForm />
          <TodoList />
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </DateContextProvider>
      </TodoContextProvider>
    </div>
  );
}

export default App;
