import { useEffect } from 'react';
import { db } from './firebase';

function ValitseTiimiNimi({ names, setValues }) {
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

          setValues((prevValues) => {
            return prevValues.map((value) => {
              if (value.includes('x')) {
                return value.replace('x', getRandomTeamName(TeamName1, TeamName2));
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

  function getRandomTeamName(name1, name2) {
    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    return [name1, name2][randomIndex];
  }

  return null;
}

export default ValitseTiimiNimi;
