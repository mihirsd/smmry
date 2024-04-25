import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    }).then(res => res.json())
      .then(data => setData(data.query));
  }
  
  return (
    <div className="App">
      <div className="container mx-auto mt-16">
        <h1 className="font-title text-6xl">Smmry</h1>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mx-2">
              <input type="text" name="query" placeholder="Enter query" onChange={e => setQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 border-2 border-gray-200 appearance-none rounded text-gray-700 text-xl leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
            </div>
            <div className="my-2">
              <button type="submit"
                className="px-8 py-2 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white text-lg font-bold rounded">
                  Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {data}
    </div>
  )
}

export default App;
