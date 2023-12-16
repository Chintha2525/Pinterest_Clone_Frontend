import React from "react";
import { Form , FloatingLabel } from "react-bootstrap";

const Notes = () => {
  return (
    <div>
      <FloatingLabel
        label="Notes"
        className="my-3"
      >
        <Form.Control as="textarea" style={{height:"100px"}} placeholder="Ingredients" />
      </FloatingLabel>
    </div>
  );
};

export default Notes;
