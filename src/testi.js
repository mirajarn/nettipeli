

function MyComponent() {
  const [data, setData] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Alice' }
  ]);

  const shuffleArray = () => {
    const shuffledData = [...data];
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    setData(shuffledData);
  };

  return (
    <div>
      <button onClick={shuffleArray}>Shuffle</button>
      {data.map(item => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
