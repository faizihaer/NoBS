const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
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
