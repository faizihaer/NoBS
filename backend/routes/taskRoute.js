const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { action, taskBody, userId } = req.body;
    // Check if the user already exists in the database
    let user = await User.findOne({ _id: userId });
    if (action === "createTask"){
        user.tasks.push(taskBody);
        user.taskBools.push(false);
        user.taskTimes.push(null);
        await user.save();
    } else if (action === "checkBox") {
        let i = 0;
        for (i; i < user.tasks.length; i++){
            if (taskBody == user.tasks[i]){
                user.taskBools[i] = true;
                user.taskTimes[i] = new Date().toLocaleTimeString();
                await user.save();
                break;
            }
        }
    } else if (action === "unCheckBox") {
        let i = 0;
        for (i; i < user.tasks.length; i++){
            if (taskBody == user.tasks[i]){
                user.taskBools[i] = false;
                user.taskTimes[i] = null;
                await user.save();
                break;
            }
        }
    } else if (action === "delete") {
        let i = 0;
        for (i; i < user.tasks.length; i++){
            if (taskBody == user.tasks[i]){
                user.tasks.splice(i, 1);
                user.taskBools.splice(i, 1);
                user.taskTimes.splice(i, 1);
                await user.save();
                break;
            }
        }
    } 

    res.status(200).json({ message: "Task created successfully", taskBody });
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(500)
      .json({ message: "Error authenticating user", error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { action, userId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (action === "getTasks"){
        res.json(user.tasks);
        console.log("Tasks retrieved");
    } else if (action === "getBools"){
        res.json(user.taskBools);
        console.log("Task Bools retrieved");
    } else if (action === "getTimes"){
        res.json(user.taskTimes);
        console.log("Task Timestamps retrieved");
    } 
  } catch (error) {
    console.error("Error getting Tasks (or other data)", error);
    res
      .status(500)
      .json({ message: "Error getting Tasks (or other data)", error: error.message });
  }
});



module.exports = router;
