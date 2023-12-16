import React, { useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";

const Supplies = (onSelect) => {
  const [selectedOptions, setSelectedOptions] = useState({
    difficulty: "",
    supplies: "",
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


  const handleInput = (e) => {

    const { value, name } = e.target;

    setSelectedOptions((prev) => {
      return { ...prev, [name]: value, "supplies": text };
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

    onSelect(selectedOptions)

  }
  return (
    <div className="my-5">
      <label for="serving">Difficulty</label>
      <Form.Select aria-label="Floating label select example" onChange={handleChange}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Difficult">Difficult</option>
      </Form.Select>

      <FloatingLabel
        label="Supplies"
        className="my-3"
      >
        <Form.Control as="textarea" style={{ height: "100px" }} name="supplies" placeholder="Supplies" onInput={handleInput} onChange={handleInputChange} value={text} onKeyDown={handleKeyDown} />
      </FloatingLabel>
    </div>
  );
};

export default Supplies;
