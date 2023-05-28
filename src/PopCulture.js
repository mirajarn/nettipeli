import React, { useState, useEffect } from 'react';
import { db } from './firebase';

function PopCulture(names) {
  const [values, setValues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = db.collection('react-app').doc('Pop Culture');

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

  const HandleButtonClick = () => {
    setShowItems(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
  };

  const handlePrev = () => {
    setCurrentIndex((NextIndex) => (NextIndex - 1) % values.length);
  };

  return (
    <div  >
      <button onClick={HandleButtonClick}>Tehtäviä</button>

      {showItems && (
        <div>
          <h1>Kulttuuria</h1>
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

export default PopCulture;
