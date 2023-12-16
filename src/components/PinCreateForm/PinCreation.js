import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import CreatePin from "./Create";
import PinForm from "../../pages/Creation/PinForm";
const PinCreation = (props) => {
  const [modalShow, setModalShow] = useState(true);
  const show = () => {
    setModalShow(true);
  };
  const hide = () => {
    setModalShow(!modalShow);
  };
  return (
    <Container>
      <div className="something">
        <div>
          <img
            src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-up-arrow-icon-png-image_956434.jpg"
            alt="source"
          ></img>
        </div>
        <div className="end">
          <PinForm />
        </div>
      </div>
      <CreatePin show={modalShow} onHide={hide} />
    </Container>
  );
};

export default PinCreation;
