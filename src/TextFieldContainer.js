import React, { useState } from 'react';
import './App.css';

const TextFieldContainer = ({ onTextFieldChange }) => {
  const [textFields, setTextFields] = useState([]);

  const addTextField = () => {
    if (textFields.length < 20) {
      setTextFields([...textFields, '']);
    }
  };

  const handleTextFieldChange = (index, value) => {
    const updatedTextFields = [...textFields];
    updatedTextFields[index] = value;
    setTextFields(updatedTextFields);
    onTextFieldChange(updatedTextFields); // Notify parent component of text field changes
  };

  return (
    <div>
      {textFields.length < 20 && <button className="add-button" onClick={addTextField}>Add Text Field</button>}
      {textFields.map((textField, index) => (
        <div key={index}>
          <input className="text-field" value={textField || ''} onChange={(e) => handleTextFieldChange(index, e.target.value)} />
        </div>
      ))}
    </div>
  );
};

export default TextFieldContainer;
