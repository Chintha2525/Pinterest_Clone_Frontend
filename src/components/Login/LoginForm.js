import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Button, InputGroup, Modal } from "react-bootstrap"
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import axios from "axios";
import Brand from "../Logo/Brand";
import './login.css'
import '../../App.css'
import { AuthContext } from "../../context/AuthContext";
import { Config } from "../../config/config";

const Login = (props) => {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState({})

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);



  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
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
    setValidated(true)

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${Config.api}/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.reload()
      setShow(false)

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      setError(err.response.data.errors)
    }
  };

  const [show, setShow] = useState(true);

  const handleClose = () => {

    setShow(false)
    navigate('/')
  };
  const handleShow = () => setShow(!show);

  return (
    <>
      <Modal {...props} centered >
        <Modal.Header className="border-0">
          <Modal.Title className="mx-auto d-block">
            <Brand className="mx-auto d-block" />
          </Modal.Title>
          <Modal.Title className="text-center">Welcome to Pinterest</Modal.Title>
        </Modal.Header>
        <Modal.Body >

          <Container>
            {validated && error ? <h6 className="text-danger mx-auto">{error.email ? error.email : error.password}</h6> : ""}
            <Form noValidate validated={validated} className="mt-3 signup">

              <Form.Group className="m-3 " >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" id="email" onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">
                  {error.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="m-3">
                <Form.Label>Password</Form.Label>
                <InputGroup >
                  <Form.Control type={type} placeholder="Password" id="password" onChange={handleChange} required />
                  <InputGroup.Text className="bg-none"><span onClick={handleToggle}>
                    <Icon class="absolute m-10" icon={icon} size={15} />
                  </span>
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {error.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>


              <Form.Group className="m-3" >
                <Button className="btn btn-dark rounded-pill w-100" onClick={handleClick} >Login</Button>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer className="border-0 mx-4 justify-content-center">
          <div className="text ">
            By continuing, you agree to Pinterest's <a className="text-decoration-none text-bold d-inline" href="#">Terms of Service;</a> and acknowledge you've read our <a href="#" className="text-decoration-none fw-bold d-inline">Privacy Policy</a> Notice at collection
            <br />
          </div>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Login;


