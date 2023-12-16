import { Modal } from "react-bootstrap";
import "../../App.css";

import UploadImg from "../../pages/UploadImage/UploadImg";
import Icon from "react-icons-kit";
import { ic_keyboard_backspace_twotone } from "react-icons-kit/md/ic_keyboard_backspace_twotone";
function CreatePin(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="height"
    >
      <Modal.Header className="border-0 height">
        <button className="back-button left-top" onClick={() => { window.history.back() }}>
          <Icon icon={ic_keyboard_backspace_twotone} size={30} />
        </button>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="ms-6 p-2 d-block"
        >
          Create Pin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UploadImg />
      </Modal.Body>
      <Modal.Footer className="border-0">
      </Modal.Footer>
    </Modal>
  );
}

export default CreatePin;
