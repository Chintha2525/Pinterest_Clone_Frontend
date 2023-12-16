import React, { useState } from "react";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { minutes, hours, serving } from "./optionList";

const Ingridents = ({ onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    hours: "",
    minutes: "",
    serving: "",
    ingredient: "",
  });
  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    const newText = event.target.value;
    const newTextWithBulletPoints = addBulletPoints(newText);
    setText(newTextWithBulletPoints);
  };

  const addBulletPoints = (text) => {
    const lines = text.split('\n');

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].startsWith('• ')) {
        lines[i] = '• ' + lines[i];
      }
    }
    return lines.join('\n');
  };
  const createOption = (el, id) => {
    return <option value={id}>{el}</option>;
  };

  const handleInput = (e) => {

    const { value, name } = e.target;

    setSelectedOptions((prev) => {
      return { ...prev, [name]: value, "ingredient": text };
    });
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      const textarea = event.target;
      const value = event.target.value
      const selectionStart = textarea.selectionStart;
      if (
        value[selectionStart - 3] == "•") {

        const updatedText = value.slice(0, selectionStart - 4) + value.slice(selectionStart,);
        setText(updatedText);
        event.preventDefault();
      }
    }
  };

  const handleChange = () => {

    onSelect(JSON.stringify(selectedOptions))

  }
  return (
    <div className="">
      <label htmlFor="time">Cooking Time</label>
      <Row>
        <Col>
          <Form.Select aria-label="Floating label select example" name="hours" onInput={handleInput} onChange={handleChange}>
            {hours.map(createOption)}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select aria-label="Floating label select example" name="minutes" onInput={handleInput} onChange={handleChange}>
            {minutes.map(createOption)}
          </Form.Select>
        </Col>
      </Row>

      <label htmlFor="serving">Serving</label>
      <Form.Select aria-label="Floating label select example" name="serving" onInput={handleInput} onChange={handleChange} >
        {serving.map(createOption)}
      </Form.Select>
      <FloatingLabel
        label="Ingredients"
        className="my-3"
      >
        <Form.Control as="textarea" style={{ height: "100px" }} name="ingredient" placeholder="Ingredients" onInput={handleInput} onChange={handleInputChange} value={text} onKeyDown={handleKeyDown} />
      </FloatingLabel>
    </div>
  );
};

export default Ingridents;
