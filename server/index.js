require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

// Middleware
app.use(cors(corsOptions)); // Use CORS middleware with options
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

connectDB(); 

// Register routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);

// Apply authMiddleware AFTER routes that need it
app.use(authMiddleware);
app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const item = req.body;
    items.push(item); 
    res.status(201).json(item);
});

app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    items = items.map(item => item.id === id ? updatedItem : item);
    res.json(updatedItem);
});

app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id !== id);
    res.status(204).end();
});

// Serve React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all for React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
