const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    tasks: [ { type: String } ],
    taskBools: [ { type: Boolean } ],
    taskTimes: [ { type: String } ],
    age: { type: Number },
    weight: { type: Number },
    feet: { type: Number },
    inches: { type: Number },
    group:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
