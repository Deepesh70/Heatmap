const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  count: { type: Number, required: true, default: 0 },
  // Link to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to our 'User' model
    required: true,
  },
});

// Ensure a user can only have one entry per day
submissionSchema.index({ date: 1, user: 1 }, { unique: true });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;