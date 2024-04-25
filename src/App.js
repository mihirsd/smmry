import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Spinner() {
  return (
    <div className="container mt-4 max-w-4xl">
      <svg xmlns="http://www.w3.org/2000/svg" style={{margin: "auto", background: "rgb(255, 255, 255) none repeat scroll 0% 0%", display: "block", shapeRendering: "auto"}} width="75px" height="75px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="#9f7aea" stroke-width="5" r="25" stroke-dasharray="117.80972450961724 41.269908169872416">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
      </svg>
    </div>
  );
}

function Summary(props) {
  const data = props.data;
  return (
    <div className="container mx-auto mt-4 max-w-4xl text-left bg-white border border-gray-300 rounded-lg overflow-hidden shadow-xl">
      <div className="p-6">
        <h4 className="font-semibold text-md text-purple-600 pb-2">
          Summary
        </h4>
        <p className="text-justify leading-tight">
          {data.summary}
        </p>
        <h4 className="font-semibold text-md text-purple-600 py-2">
          Sources
        </h4>
        <ul className="list-disc text-left px-4">
          {data.urls && data.urls.map((url) => (
            <li className="text-blue-700">
              <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState('');
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        const res = await axios.post('/api', {
          query: query
        });
        setLoading(false);
        setHasData(true);
        setData(res.data);
      }
    };
    fetchData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setHasData(false);
    setQuery(e.target[0].value);
  };
  
  return (
    <div className="App min-h-screen flex flex-col antialiased text-gray-900">
      <div className="flex-grow container mx-auto mt-4">
        <h1 className="font-title text-6xl"><a href="/">Smmry</a></h1>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <input type="text" name="query" placeholder="Enter query" disabled={loading ? 'disabled' : ''} required
              className="w-full px-4 py-2 bg-gray-200 border-2 border-gray-300 appearance-none rounded-lg text-gray-700 text-xl leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
          </form>
        </div>
        { loading ? <Spinner/> : hasData ? <Summary data={data}/> : ''}
      </div>
      <footer className="w-full text-center text-gray-600 p-4">
        &copy; 2020&emsp;<a href="https://github.com/mihir3k/smmry">GitHub</a>
      </footer>
    </div>
  )
}

export default App;
