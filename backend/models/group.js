const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  checked: { type: Boolean, required: true }
});

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [taskSchema] // Use taskSchema for the tasks array
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
