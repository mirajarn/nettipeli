import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { TarkistaTehtaviaPop } from './TarkistaTehtaviaPop';


function Tehtavia({ tiimi1, tiimi2 }) {
  const [values, setValues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showItems, setShowItems] = useState(false);
  const [tiimitNimet, setTiimiNimet] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const docRefTeamName = db.collection('react-app').doc('Team Names');
      try {
        const docSnapshotTeamName = await docRefTeamName.get();
        if (docSnapshotTeamName.exists) {
          const dataTeamName = docSnapshotTeamName.data();
          const valueFieldsTeamName = Object.values(dataTeamName);

          const TeamName1 = valueFieldsTeamName[0];
          const TeamName2 = valueFieldsTeamName[1];

          setTiimiNimet([TeamName1, TeamName2]);

          setValues((prevValues) => {
            return prevValues.map((value) => {
              if (value.includes('x')) {
                const replacedValue = value.replace('x', getRandomTeamName(TeamName1, TeamName2));

                return replacedValue
              }
              return value;
            });
          });
        }
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const docRefPop = db.collection('react-app').doc('TehtäviäKysymysPop');
      try {
        const docSnapshotPop = await docRefPop.get();
        if (docSnapshotPop.exists) {
          const dataPop = docSnapshotPop.data();
          const valueFieldsPop = Object.values(dataPop);


          const numero = getRandomKysymys(valueFieldsPop)
          const vastaus = valueFieldsPop[numero]
          setValues((prevValues) => {
            return prevValues.map((value) => {
              if (value.includes('popKysymys')) {

                return value.replace('popKysymys', vastaus);
              }
              return value;
            });
          });
        }
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const docRefHistoria = db.collection('react-app').doc('TehtäviäKysymysHistoria');
      try {
        const docSnapshotHistoria = await docRefHistoria.get();
        if (docSnapshotHistoria.exists) {
          const dataHistoria = docSnapshotHistoria.data();
          const valueFieldsHistoria = Object.values(dataHistoria);

          const numero = getRandomKysymys(valueFieldsHistoria)
          const vastaus = valueFieldsHistoria[numero]
          setValues((prevValues) => {
            return prevValues.map((value) => {
              if (value.includes('historiaKysymys')) {

                return value.replace('historiaKysymys', vastaus);
              }
              return value;
            });
          });
        }
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const docRefTiede = db.collection('react-app').doc('TehtäviäKysymysTiede');
      try {
        const docSnapshotTiede = await docRefTiede.get();
        if (docSnapshotTiede.exists) {
          const dataTiede = docSnapshotTiede.data();
          const valueFieldsTiede = Object.values(dataTiede);

          const numero = getRandomKysymys(valueFieldsTiede)
          const vastaus = valueFieldsTiede[numero]
          setValues((prevValues) => {
            return prevValues.map((value) => {
              if (value.includes('tiedeKysymys')) {

                return value.replace('tiedeKysymys', vastaus);
              }
              return value;
            });
          });
        }
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);
  function getRandomKysymys(array) {
    var length = array.length;
    var randomNumber = Math.floor(Math.random() * length);
    return randomNumber;
  }

  function getRandomTeamName(name1, name2) {
    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    return [name1, name2][randomIndex];
  }

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
          <h1>Tiimit:</h1>
          {tiimitNimet.length > 0 && (
            <div>
              <h2>{tiimitNimet[0]}</h2>
              {tiimi1.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
              <h2>{tiimitNimet[1]}</h2>
              {tiimi2.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          )}
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
    </div>
  );
}

export default Tehtavia;