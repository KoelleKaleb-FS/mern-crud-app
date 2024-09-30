const express = require('express');
const bcrypt = require('bcrypt'); 
const User = require('../models/user');
const router = express.Router(); 

// Register new user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password }); // Don't hash here
        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

module.exports = router;
