import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        axios.post('/api', {
          query: query
        }).then((res) => {
          setData(res.data);
          setDisabled(false);
        });
      }
    };
    fetchData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    setQuery(e.target[0].value);
  };
  
  return (
    <div className="App">
      <div className="container mx-auto mt-16">
        <h1 className="font-title text-6xl">Smmry</h1>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mx-2">
              <input type="text" name="query" placeholder="Enter query" disabled={disabled ? 'disabled' : ''} required
                className="w-full px-4 py-2 bg-gray-200 border-2 border-gray-200 appearance-none rounded text-gray-700 text-xl leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
            </div>
          </form>
        </div>
      </div>
      {data.summary}
    </div>
  )
}

export default App;
