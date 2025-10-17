const express = require('express');
const router = express.Router();
const Submission = require('../models/submissionModel');
const auth = require('../middleware/authMiddleware'); // Import the middleware

// Hardcoded correct answers
const correctAnswers = { q1: 'Paris', q2: 'Mars', q3: 'H2O' };

// --- PROTECTED ROUTES ---
// All routes defined after this will use the 'auth' middleware

// POST route to handle quiz submissions (now protected)
router.post('/submit', auth, async (req, res) => {
  const userAnswers = req.body;
  let score = 0;

  for (const questionId in userAnswers) {
    if (userAnswers[questionId] === correctAnswers[questionId]) {
      score++;
    }
  }

  if (score === 0) {
    return res.status(200).json({ message: 'No new correct answers to record.' });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // We now filter by date AND user ID from the token
    const result = await Submission.findOneAndUpdate(
      { date: today, user: req.user.id },
      { $inc: { count: score }, $setOnInsert: { user: req.user.id } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Submission recorded!', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error recording submission', error });
  }
});

// GET route to fetch heatmap data (now protected)
router.get('/data', auth, async (req, res) => {
  try {
    // We only find data for the logged-in user
    const data = await Submission.find({ user: req.user.id });
    const formattedData = data.map(item => ({
      date: item.date.toISOString().split('T')[0],
      count: item.count
    }));
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

module.exports = router;