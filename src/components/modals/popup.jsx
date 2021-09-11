import React from "react";
import { Modal, Button, FormControl, InputGroup } from "react-bootstrap";

const Popup = ({
  show,
  handleClose,
  handleCommit,
  handleFormChange,
  popupData: { todo, date },
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{todo.title} Commit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>Title</InputGroup.Text>
          <FormControl
            name="title"
            placeholder="Commit Title"
            aria-label="CommitTitle"
            aria-describedby="basic-addon1"
            onChange={handleFormChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Message</InputGroup.Text>
          <FormControl
            name="content"
            as="textarea"
            aria-label="With textarea"
            onChange={handleFormChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCommit}>
          {date}Commit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
