import React, { useState, useEffect } from 'react';
import TextFieldContainer from './TextFieldContainer';
import Tehtavia from './Tehtavia';
import Tietovisa from './Tietovisa';
import './App.css';

const MainPage = () => {
  const [list, setList] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  

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
useEffect(() => {
  const shuffleNames = () => {
    const shuffledNames = shuffleArray(list);
    const halfLength = Math.ceil(shuffledNames.length / 2);

    const team1Names = shuffledNames.slice(0, halfLength);
    const team2Names = shuffledNames.slice(halfLength);

    setTeam1(team1Names);
    setTeam2(team2Names);
  };

  shuffleNames();
}, [list]);

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

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
          <Tehtavia tiimi1={team1} tiimi2={team2} TehtaviaMembers={list} />
          <Tietovisa tietovisaMembers={list}  />
        </div>
      )}
    </div>
  );
};

export default MainPage;
