import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import GeneroiNimiTietovisaan from './GeneroiNimiTietovisaan';

function Tietovisa({ tietovisaMembers }) {
  const [values, setValues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = db.collection('react-app').doc('Tietovisa');

      try {
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
          const data = docSnapshot.data();
          const fetchedValues = Object.values(data);
          setValues(fetchedValues);
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    setShowItems(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
  };

  const handlePrev = () => {
    setCurrentIndex((nextIndex) => (nextIndex - 1 + values.length) % values.length);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Tietovisa</button>

      {showItems && (
        <div>
          <h1>Jaa viisauttasi!</h1>

          <GeneroiNimiTietovisaan tietovisaMembers={tietovisaMembers} currentIndex={currentIndex} />
          {values.length > 0 && (
            <div>
              <p>{values[currentIndex]}</p>
              <button onClick={handlePrev}>Edellinen</button>
              <button onClick={handleNext}>Seuraava</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Tietovisa;
