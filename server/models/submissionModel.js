const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  count: { type: Number, required: true, default: 0 }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;