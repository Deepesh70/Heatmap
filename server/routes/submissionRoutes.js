const express = require('express');
const router = express.Router();
const Submission = require('../models/submissionModel'); // Model import moved here

// Hardcoded correct answers are now in the routes file
const correctAnswers = { q1: 'Paris', q2: 'Mars', q3: 'H2O' };

// --- Define Routes with Inline Controller Logic ---

// POST route to handle quiz submissions
router.post('/submit', async (req, res) => {
  const userAnswers = req.body;
  let score = 0;

  // Calculate score
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
    const result = await Submission.findOneAndUpdate(
      { date: today },
      { $inc: { count: score } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Submission recorded!', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error recording submission', error });
  }
});

// GET route to fetch all submission data
router.get('/data', async (req, res) => {
  try {
    const data = await Submission.find({});
    const formattedData = data.map(item => ({
      date: item.date.toISOString().split('T')[0], // format as 'YYYY-MM-DD'
      count: item.count
    }));
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

module.exports = router;