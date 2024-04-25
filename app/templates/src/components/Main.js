import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Spinner from './views/Spinner';
import Summary from './views/Summary';

function Main() {
  const [query, setQuery] = useState('');

  const [data, setData] = useState('');
  const [hasData, setHasData] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setHasData(false);
    setQuery(e.target[0].value);
  };

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

  return(
    <div className="Main flex-grow">
      <div className="container mx-auto mt-2 px-4 md:px-0">
        <p className="text-center text-6xl font-title">Smmry</p>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <input type="text" name="query" placeholder="Enter query" disabled={loading ? 'disabled' : ''} required
              className="w-full px-4 py-2 bg-gray-200 border-2 border-gray-200 focus:bg-white focus:border-purple-500 text-gray-700 text-xl leading-tight rounded-lg appearance-none"/>
          </form>
        </div>
      </div>
      { loading? <Spinner/> : hasData ? <Summary data={data}/> : null }
    </div>
  );
}

export default Main;
