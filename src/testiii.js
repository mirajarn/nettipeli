useEffect(() => {
    const fetchData = async () => {
      const docRefPop = db.collection('react-app').doc('TehtäviäKysymysHistoria');
      try {
        const docSnapshotPop = await docRefPop.get();
        if (docSnapshotPop.exists) {
          const dataPop = docSnapshotPop.data();
          const valueFieldsPop = Object.values(dataPop);

          const eka = valueFieldsPop[0];

          setpoplause([eka]);

          setValues((prevValues) => {
            return prevValues.map((value) => {
              if (value.includes('popKysymys')) {

                return value.replace('popKysymys', poplause);
              }
              return value;
            });
          });
        }
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };