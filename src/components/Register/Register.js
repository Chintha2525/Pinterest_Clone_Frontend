import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Container, Button, InputGroup, Modal } from "react-bootstrap";
import "../Login/login.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Brand from "../Logo/Brand";
import { Config } from "../../config/config";

const Register = (props) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(true);
  const [error, setError] = useState({})

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };
  const handleShow = () => setShow(true);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const [credentials, setCredentials] = useState({
    fname: undefined,
    email: undefined,
    password: undefined,
    dob: undefined
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    else {
      setValidated(true);
      try {
        const res = await axios.post(`${Config.api}/register`, credentials);
        alert("Signed up successfully")
        window.location.reload()
      } catch (err) {
        console.log(err);
        setError(err.response.data.errors)
      }
    }
  };

  return (
    <>
      <Modal {...props} className="" centered>
        <Modal.Header className="border-0">
          <Modal.Title className="mx-auto d-block">
            <Brand className="mx-auto d-block" />
          </Modal.Title>
          <Modal.Title className="text-center">
            Welcome to Pinterest
          </Modal.Title>
          <Modal.Title className="text-center h6 font-weight-normal">
            Find new ideas to try
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Container>
            {validated && error ? <h6 className="text-danger mx-auto">{error.email ? error.email : error.name}</h6> : ""}
            <Form noValidate validated={validated} className="mt-3 signup">
              <Form.Group className="m-3 ">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  id="fname"
                  name="fname"
                  onChange={handleChange}
                  required
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {error.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="m-3 ">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {error.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="m-3">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type={type}
                    placeholder="Create Password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <InputGroup.Text className="bg-none">
                    <span onClick={handleToggle}>
                      <Icon class="absolute m-10" icon={icon} size={15} />
                    </span>
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {error.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="m-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Create Password"
                  id="dob"
                  name="dob"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="m-3">
                <Button
                  className="btn btn-dark rounded-pill w-100"
                  onClick={handleClick}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer className="border-0 mx-4 justify-content-center">
          <div className="text ">
            By continuing, you agree to Pinterest's{" "}
            <a className="text-decoration-none text-bold d-inline" href="#">
              Terms of Service;
            </a>{" "}
            and acknowledge you've read our{" "}
            <a href="#" className="text-decoration-none fw-bold d-inline">
              Privacy Policy
            </a>{" "}
            Notice at collection
            <br />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
