// backend/routes/groupRoute.js
const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const User = require("../models/user");

router.post("/", async (req, res) => {
  //console.log(req.body);
  const { name, action, userId } = req.body;
  try {
    // Logic based on the action parameter
    if (action === "createGroup") {
      // Logic for creating a new group
      const existingGroup = await Group.findOne({ name: name });
      if (existingGroup) {
        // If a group with the same name exists, send an error response
        return res
          .status(400)
          .json({ message: "Group with this name already exists" });
      }
      // Create a new group
      const newGroup = new Group({ name });
      await newGroup.save();
      // Oh, if only you knew the effort that went into these next three lines! passing in the userId here proved more than useful, allowing the user's group variable to be updated as soon as the group is created
      const user = await User.findOne({ _id: userId });
      user.group = newGroup;
      await user.save();

      // Add the creator (assuming they are the user making the request) to the group
      newGroup.users.push(userId);
      await newGroup.save();

      res
        .status(200)
        .json({ message: "Group created successfully", group: newGroup });
    } else if (action === "joinGroup") {
      const existingGroup = await Group.findOne({ name: name });
      if (existingGroup) {
        // Add the creator (assuming they are the user making the request) to the group
        existingGroup.users.push(userId);
        await existingGroup.save();
        // second use of these three lines, just for adding to an existing group. How did I not think of that sooner?
        const user = await User.findOne({ _id: userId });
        user.group = existingGroup;
        await user.save();
        console.log("Group joined successfully");
        res.status(200).json({ message: "Group joined successfully" });
      } else {
        console.log("Group not found");
        return res.status(404).json({ message: "Group not found" }); //404 not found
      }
    } else {
      // Handle other cases or invalid actions
      res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.get("/groupName", async (req, res) => {
  const { groupId } = req.query;

  try {
    // Find the group by ID
    const group = await Group.findById(groupId);

    // Check if the group exists
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Return the group's name
    res.status(200).json({ groupName: group.name });
  } catch (error) {
    console.error("Error fetching group name:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { action, taskBody } = req.body;
//     const existingGroup = await Group.findOne({ groupId });
//     if (existingGroup) {
//       if (action === "createTask") {
//         user.tasks.push(taskBody);
//         user.taskBools.push(false);
//         user.taskTimes.push(null);
//         await user.save();
//       } else if (action === "checkBox") {
//         let i = 0;
//         for (i; i < user.tasks.length; i++) {
//           if (taskBody == user.tasks[i]) {
//             user.taskBools[i] = true;
//             user.taskTimes[i] = new Date().toLocaleTimeString();
//             await user.save();
//             break;
//           }
//         }
//       } else if (action === "unCheckBox") {
//         let i = 0;
//         for (i; i < user.tasks.length; i++) {
//           if (taskBody == user.tasks[i]) {
//             user.taskBools[i] = false;
//             user.taskTimes[i] = null;
//             await user.save();
//             break;
//           }
//         }
//       } else if (action === "delete") {
//         let i = 0;
//         for (i; i < user.tasks.length; i++) {
//           if (taskBody == user.tasks[i]) {
//             user.tasks.splice(i, 1);
//             user.taskBools.splice(i, 1);
//             user.taskTimes.splice(i, 1);
//             await user.save();
//             break;
//           }
//         }
//       }
//       console.log("Task created successfully");
//       res.status(200).json({ message: "Task created successfully", taskBody });
//     } else {
//       console.log("Group not found");
//       return res.status(404).json({ message: "Group not found" }); //404 not found
//     }
//   } catch (error) {
//     console.error("Error creating task:", error);
//     res
//       .status(500)
//       .json({ message: "Error creating task", error: error.message });
//   }
// });

//------------------------------------

// router.post("/", async (req, res) => {
//   const { groupId, tasks } = req.body;
//   console.log("groupID: " + groupId);
//   console.log("tasks: " + tasks);

//   try {
//     const updatedGroup = await Group.findByIdAndUpdate(
//       { userGroupId: groupId },
//       { $set: { tasks: tasks } },
//       { new: true, upsert: true }
//     );

//     res
//       .status(200)
//       .json({ message: "Updated group successfully", updatedGroup });
//   } catch (error) {
//     console.error("Error updating group tasksArr:", error.message);
//     res
//       .status(500)
//       .json({ message: "Error creating tasksArr", error: error.message });
//   }
// });

module.exports = router;
