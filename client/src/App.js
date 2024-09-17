// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';

const API_URL = 'https://mern-crud-app-cfa78a173530.herokuapp.com';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', value: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      fetch(`${API_URL}/items/${newItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })
      .then(res => res.json())
      .then(data => {
        setItems(items.map(item => item.id === data.id ? data : item));
        setNewItem({ id: '', name: '', value: '' });
        setEditItem(null);
      })
      .catch(error => console.error('Error updating item:', error));
    } else {
      fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })
      .then(res => res.json())
      .then(data => {
        setItems([...items, data]);
        setNewItem({ id: '', name: '', value: '' });
      })
      .catch(error => console.error('Error adding item:', error));
    }
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setItems(items.filter(item => item.id !== id));
    })
    .catch(error => console.error('Error deleting item:', error));
  };

  const handleEdit = (item) => {
    setNewItem(item);
    setEditItem(item);
  };

  return (
    <div className="App">
      <Header />
      <Home />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={newItem.id}
          onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Value"
          value={newItem.value}
          onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
        />
        <button type="submit">{editItem ? 'Update Item' : 'Add Item'}</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.value}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
