// src/App.js
import React, { useState } from 'react';
import PlacementList from './PlacementList';
import Lister from './Lister';
import Login from './Login';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;
