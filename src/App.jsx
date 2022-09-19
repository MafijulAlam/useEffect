import { useState, useEffect } from 'react';
import './App.css';

const catchData = {};
function App() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(1);
  const [loding, setLoding] = useState(false);
  const max = 10;
  useEffect(() => {
    if (catchData[`user-${id}`]) {
      setUser(catchData[`user-${id}`]);
      return;
    }
    setLoding(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        catchData[`user-${id}`] = data;
      })
      .finally(() => setLoding(false));
  }, [id]);
  const prevHandler = () => {
    if (id > 1) {
      setId(id - 1);
    }
  };
  const nextHandler = () => {
    if (id < max) {
      setId(id + 1);
    }
  };
  console.log(id);
  return (
    <div>
      <h1>User Details-{id}</h1>
      {loding && <p>Loding....</p>}
      {!loding && user && (
        <div>
          Name: {user.name}
          <br />
          Email:{user.email}
          <br />
          Phone:{user.phone}
        </div>
      )}
      <button disabled={id === 1} onClick={prevHandler}>
        Prev
      </button>
      <button disabled={id == max} onClick={nextHandler}>
        Next
      </button>
    </div>
  );
}

export default App;
