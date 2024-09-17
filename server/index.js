const express = require('express');
const path = require('path'); // Add this line
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Middleware
app.use(cors());
app.use(express.json());

let items = []; // In-memory data store

// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST a new item
app.post('/items', (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).json(item);
});

// PUT/PATCH to update an item
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  items = items.map(item => item.id === id ? updatedItem : item);
  res.json(updatedItem);
});

// DELETE an item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
