import React, { useState, useEffect } from 'react';
import './Login.css'; // Add styling for the login component
import credentials from './credentials.json'; // Import your credentials

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert input username to lowercase
    const lowerCaseUsername = username.toLowerCase();
  
    // Validate credentials
    const user = credentials.find(
      (user) => user.username.toLowerCase() === lowerCaseUsername && user.password === password
    );
  
    if (user) {
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
