const Submission = require('../models/submissionModel');

// Hardcoded correct answers
const correctAnswers = { q1: 'Paris', q2: 'Mars', q3: 'H2O' };

// Controller function to handle quiz submissions
exports.submitAnswers = async (req, res) => {
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
};

// Controller function to fetch all submission data
exports.getHeatmapData = async (req, res) => {
  try {
    const data = await Submission.find({});
    const formattedData = data.map(item => ({
        date: item.date.toISOString().split('T')[0], // 'YYYY-MM-DD'
        count: item.count
    }));
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};