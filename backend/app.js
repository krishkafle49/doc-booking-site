const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/sajilocare'; // You can name the DB anything you like

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

