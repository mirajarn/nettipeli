import React, { useState } from 'react';
import TextFieldContainer from './TextFieldContainer';
import Tehtavia from './Tehtavia';
import Tietovisa from './Tietovisa';
import JaaNimetTiimeihin from './JaaNimetTiimeihin';
import firebase from 'firebase/compat/app';
import './App.css';

const MainPage = () => {
  const [list, setList] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = (newList) => {
    setList(newList);
  };

  const handleButtonClick = () => {
    const lista = [...list, textFieldValue];
    lista.forEach((item, index) => {
      console.log(`Item ${index + 1}: ${item}`);
    });
    setTextFieldValue('');
    setShowButtons(true);
  };

  return (
    <div className="container">
      <TextFieldContainer onTextFieldChange={handleTextFieldChange} />
      <button className="start-button" onClick={handleButtonClick}>
        Aloita
      </button>
      <h1 className="players-heading">Pelaajat:</h1>
          <JaaNimetTiimeihin memberNames={list} />

      {showButtons && (
        <div>
          <Tehtavia />

        </div>
      )}
    </div>
  );
};

export default MainPage;
