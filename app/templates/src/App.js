import React from 'react';

import Main from './components/Main';
import Footer from './components/Footer';

function App() {  
  return (
    <div className="App flex flex-col min-h-screen antialiased bg-gray-100">
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
