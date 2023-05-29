import React, { useState } from 'react';
import TextFieldContainer from './TextFieldContainer';
import Tehtavia from './Tehtavia';
import Tietovisa from './Tietovisa';
import './App.css';
import GeneroiNimiTietovisaan from './GeneroiNimiTietovisaan';

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
 //Tällä kirjoitetaan databaseen tietoa
/*
  const db = firebase.firestore();
  const docRef = db.collection('react-app').doc('');

  const fieldsToAdd = {
    
    
  };

  docRef
    .update(fieldsToAdd)
    .then(() => {
      console.log('Fields added successfully!');
    })
    .catch((error) => {
      console.error('Error adding fields:', error);
    });
  
*/


  return (
    <div className="container">
      <TextFieldContainer onTextFieldChange={handleTextFieldChange} />
      <button className="start-button" onClick={handleButtonClick}>
        Aloita
      </button>
      <h1 className="players-heading">Pelaajat:</h1>
      <ul className="players-list">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {showButtons && (
        <div>
          <Tehtavia />
          <Tietovisa tietovisaMembers={list}  />

        </div>
      )}
    </div>
  );
};

export default MainPage;
