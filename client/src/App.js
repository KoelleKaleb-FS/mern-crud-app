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

  // Fetch items from the API on component mount
  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `${API_URL}/items/${newItem.id}` : `${API_URL}/items`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
    .then(res => res.json())
    .then(data => {
      if (editItem) {
        setItems(items.map(item => (item.id === data.id ? data : item)));
      } else {
        setItems([...items, data]);
      }
      setNewItem({ id: '', name: '', value: '' });
      setEditItem(null);
    })
    .catch(error => console.error(`Error ${editItem ? 'updating' : 'adding'} item:`, error));
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
      <Home items={items} handleEdit={handleEdit} handleDelete={handleDelete} />
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
    </div>
  );
}

export default App;
