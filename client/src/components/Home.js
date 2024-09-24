// src/components/Home.js
import React from 'react';

const Home = ({ items, handleEdit, handleDelete }) => {
  return (
    <main className="App-main">
      <h2>Welcome to the MERN CRUD Application</h2>
      <p>This is the home page of the application.</p>
      
      <h3>Items List</h3>
      <ul>
        {items.length > 0 ? (
          items.map(item => (
            <li key={item.id}>
              {item.name} - {item.value}
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </ul>
    </main>
  );
};

export default Home;
