const express = require("express");
const router = express.Router();
const User = require("../models/user"); 

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    
    const { userId, tasks } = req.body; 
    //console.log("UserTasks is Recieving:", tasks);

    // Find the user by their ID
    const updatedUserTasks = await User.findByIdAndUpdate(
        { _id : userId },
        { $set : { tasks: tasks ,taskBools: tasks} },
        { new : true, upsert : true } 

    );
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's tasks and taskBools based on the tasksArray
    user.tasks = tasks.map(task => task.name);
    
    
    
    // Save the user document
    await user.save();

    res.json({ userTaskBools: user.taskBools });
  } catch (error) {
    console.error("Error updating user tasks:", error);
    res.status(500).json({ message: "Error updating user tasks", error: error.message });
  }
});

/*
router.post("/update", async (req, res) => {
    const { groupId } = req.body;
    console.log("groupID: " + groupId);
    console.log("tasks: " + tasks);
  
    try {
      // Find the group by name and update its tasks
      const updatedGroup = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $set: { tasks: tasks } },
        { new: true, upsert: true } // Option to create a new document if one doesn't exist
        //The new: true option specifies that the function should return the modified document rather than the original (pre-update) document
      );
  
      res
        .status(200)
        .json({ message: "Updated group successfully", updatedGroup });
    } catch (error) {
      console.error("Error updating group tasks:", error.message);
      res
        .status(500)
        .json({ message: "Error creating tasks", error: error.message });
    }
  });
  */
  
  module.exports = router;