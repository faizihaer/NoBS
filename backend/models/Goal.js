const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  completed: Boolean,
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;