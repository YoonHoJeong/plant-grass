import React from "react";
import { Modal, Button } from "react-bootstrap";

const Popup = ({
  show,
  handleClose,
  handleCommit,
  popupData: { todo, date },
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{todo.title}</Modal.Title>
        <Modal.Title>{date}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCommit}>
          Commit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
