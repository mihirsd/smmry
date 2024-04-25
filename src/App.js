import React, {useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState(0);

  useEffect(() => {
    fetch('/api').then(res => res.json()).then(data => {
      setMessage(data.message);
    });
  }, []);
  
  return (
    <div className="App">
      { message }
    </div>
  )
}

export default App;
