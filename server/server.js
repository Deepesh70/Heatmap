const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;
require('dotenv').config();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URL;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Import and Use Routes ---
const submissionRoutes = require('./routes/submissionRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api', submissionRoutes); // All routes will be prefixed with /api
app.use('/api/users', userRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});