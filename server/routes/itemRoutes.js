const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET all items
router.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST new item
router.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

// PUT/PATCH update item
router.put('/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

// DELETE item
router.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;