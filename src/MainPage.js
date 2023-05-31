import React, { useState, useEffect, useRef } from 'react';
import TextFieldContainer from './TextFieldContainer';
import Tehtavia from './Tehtavia';
import Tietovisa from './Tietovisa';
import './App.css';
import NeverHaveIEver from './NeverHaveIEver';
import ScrollToTop from './ScrollToTop';
import firebase from 'firebase/compat/app';

const MainPage = () => {
  const [list, setList] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const tehtavia = useRef(null);
  const tietovisa = useRef(null);
  const enolekoskaan = useRef(null);


  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };


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
 <ScrollToTop />

 <div className="hero">
        <ul>
          <li onClick={() => scrollToSection(tehtavia)} className="link">
            Tehtäviä
          </li>
          <li onClick={() => scrollToSection(tietovisa)} className="link">
            Tietovisa
          </li>
          <li onClick={() => scrollToSection(enolekoskaan)} className="link">
            En ole koskaan
          </li>
        </ul>

        <TextFieldContainer onTextFieldChange={handleTextFieldChange} />
      <button className="start-button" onClick={handleButtonClick}>
        Aloita
      </button>
      {showButtons && (
        <>
      <h1 className="players-heading">Pelaajat:</h1>
      <div className='horizontal-list'/>
        {list.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
</>
)}
      </div>
      <div ref={tehtavia} className="tehtavia">
        <h3>Tehtäviä</h3>
        <Tehtavia tiimi1={team1} tiimi2={team2} TehtaviaMembers={list} />
      </div>
      <div ref={tietovisa} className="tietovisa">
        <h3>Tietovisa</h3>
        <Tietovisa tietovisaMembers={list} />
      </div>
      <div ref={enolekoskaan} className="enolekoskaan">
        <h3>En ole koskaan</h3>
        <NeverHaveIEver/>
      </div>






    </div>
  );
};

export default MainPage;
