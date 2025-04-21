// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the authentication routes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Use the auth routes under '/api/auth'

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/sajilocare', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

// Start server
app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
});
