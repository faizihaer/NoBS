const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' } // Define a reference to the Group model
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
