import React, { useEffect, useState } from 'react';
import ValitseTiimiNimi from './valitseTiimiNimi';

const JaaNimetTiimeihin = ({ memberNames }) => {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  useEffect(() => {
    const shuffleNames = () => {
      const shuffledNames = shuffleArray(memberNames);
      const halfLength = Math.ceil(shuffledNames.length / 2);

      const team1Names = shuffledNames.slice(0, halfLength);
      const team2Names = shuffledNames.slice(halfLength);

      console.log("eka " + team1Names)
      console.log("toka " + team2Names)
      setTeam1(team1Names);
    
      setTeam2(team2Names);
    };

    shuffleNames();
  }, [memberNames]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <>

      <p>{team1}</p>

      <p>{team2}</p>

    </>
  );
};

export default JaaNimetTiimeihin;
