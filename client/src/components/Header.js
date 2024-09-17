// src/components/header.js
import React from 'react';

const Header = () => {
  return (
    <header className="App-header">
      <h1>MERN CRUD Application</h1>
      <nav>
        <a href="/">Home</a>
        {/* Add other navigation links here if needed */}
      </nav>
    </header>
  );
};

export default Header;
