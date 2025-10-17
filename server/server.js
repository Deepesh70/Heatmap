const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const MONGO_URI = 'mongodb+srv://Deepesh:9981749817@ggstats.dhhpaye.mongodb.net/Heatmap?retryWrites=true&w=majority&appName=cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Import and Use Routes ---
const submissionRoutes = require('./routes/submissionRoutes');
app.use('/api', submissionRoutes); // All routes will be prefixed with /api

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});