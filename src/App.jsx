import React, { useState } from 'react';
import PlacementList from './PlacementList';
import Lister from './Lister';
import './App.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        
        <h1>MSITIANS PLACEMENTS BOARD 🗿</h1>
        <button onClick={toggleForm} className="toggle-button">
          {showForm ? 'View Placements' : 'Add Placement'}
        </button>
      </header>
      {showForm ? <Lister /> : <PlacementList />}

      <footer className="app-footer">
        <p>made by love from 💖 <a href='https://www.instagram.com/gothwaltushar03/'>gothwaltushar03</a></p>
      </footer>
    </div>
  );
};

export default App;
