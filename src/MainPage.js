import React, { useState } from 'react';
import TextFieldContainer from './TextFieldContainer';
import PopCulture from './PopCulture';
import firebase from 'firebase/compat/app';
import './App.css';
import NeverHaveIEver from './NeverHaveIEver';

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

  /*const db = firebase.firestore();
  const docRef = db.collection('react-app').doc('Pop Culture');

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
        Start
      </button>
      <h1 className="players-heading">Pelaajat:</h1>
      <ul className="players-list">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {showButtons && 
        <div>
          <section id='popculture' >
          <PopCulture/>
          </section>
          <NeverHaveIEver/>
        </div>
      }
    </div>
  );
};

export default MainPage;
