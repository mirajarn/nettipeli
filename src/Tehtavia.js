import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import ValitseTiimiNimi from './valitseTiimiNimi';

function Tehtavia(_names) {
  const [values, setValues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = db.collection('react-app').doc('Tehtäviä');

      try {
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
          const data = docSnapshot.data();
          const valueFields = Object.values(data);

          setValues(valueFields);
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + values.length) % values.length);
  };

  const handleButtonClick = () => {
    setShowItems(true);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Tehtäviä</button>

      {showItems && (
        <div>
          <h1>Tee mitä käsketään!</h1>
          {values.length > 0 && (
            <div>
              <p>{values[currentIndex]}</p>
              <button onClick={handlePrev}>Edellinen</button>
              <button onClick={handleNext}>Seuraava</button>
            </div>
          )}
        </div>
      )}

{showItems && (
  <ValitseTiimiNimi names={_names} setValues={setValues} />
)}
    </div>
  );
}

export default Tehtavia;
