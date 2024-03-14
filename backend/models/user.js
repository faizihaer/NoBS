const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  checked: { type: Boolean, required: true },
  
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    tasks: [taskSchema],
    group:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
  },
  { timestamps: true,
    //toJSON: { virtuals: true }, // Ensure virtual fields are included in toJSON operations
    //toObject: { virtuals: true }, // Ensure virtual fields are included in toObject operations
  }
);

// Define a virtual property 'checkedTasksCount' that calculates the number of checked tasks
userSchema.virtual('checkedTasksCount').get(function () {
  return this.tasks.filter(task => task.checked).length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
