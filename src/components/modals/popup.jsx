import React from "react";
import { Modal, Button, FormControl, InputGroup } from "react-bootstrap";
import { usePopupForm } from "../../usePopupForm";

const Popup = ({
  show,
  handleClose,
  handleCommit,
  popupData: { todo, date },
}) => {
  const [commitMsg, handleChange] = usePopupForm();

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
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Message</InputGroup.Text>
          <FormControl
            name="content"
            as="textarea"
            aria-label="With textarea"
            onChange={handleChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleCommit(commitMsg)}>
          {date} Commit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
