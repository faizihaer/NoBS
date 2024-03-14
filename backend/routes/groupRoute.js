// backend/routes/groupRoute.js
const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const User = require("../models/user");

//Storing group information to Mongodb
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
      // Oh, if only you knew the effort that went into these next (this used to be 2, then 3, now 15ish) lines! passing in the userId here proved more than useful, allowing the user's group variable to be updated as soon as the group is created
      const user = await User.findById(userId);
      //if a user is already in a group, it will remove that user from that group
      if (user.group){
        const previousGroup = await Group.findById(user.group);
        let i = 0;
        for (i; i < previousGroup.users.length; i++) {
          if (previousGroup.users[i] == userId){
            previousGroup.users.splice(i, 1);
            previousGroup.save();
            break;
          }
        }
      }
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
        // Check if the user is already in the group
        if (existingGroup.users.includes(userId)) {
          console.log("User is already in the group");
          return res
            .status(400)
            .json({ message: "User is already in the group" });
        }

        // Update user's group reference
        const user = await User.findOne({ _id: userId });
        //if a user is already in a group, it will remove that user from that group
        if (user.group){
          const previousGroup = await Group.findById(user.group);
          let i = 0;
          for (i; i < previousGroup.users.length; i++) {
            if (previousGroup.users[i] == userId){
              previousGroup.users.splice(i, 1);
              previousGroup.save();
              break;
            }
          }
        }
        user.group = existingGroup;
        await user.save();

        // Add the creator (assuming they are the user making the request) to the group
        existingGroup.users.push(userId);
        await existingGroup.save();

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


//Sending groupInformation to frontend
/*
router.get("/groupInfo", async (req, res) => {
  const { groupId } = req.query;

  try {
    // Find the group by ID
    const group = await Group.findById(groupId).populate("users");

    // Check if the group exists
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    group.users.forEach(user => {
      console.log(`User ${user.name} has  ${user.tasks.filter(task => task.checked).length} / ${tasks.length}.`);
    });  
     

    res
      .status(200)
      .json({ groupName: group.name, friendsActivities: group.users });
  } catch (error) {
    console.error("Error fetching group information:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
*/
router.get("/groupInfo", async (req, res) => {
  const { groupId } = req.query;

  try {
    // Find the group by ID and populate the users
    const group = await Group.findById(groupId).populate("users");

    // Check if the group exists
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Map over the users to include task counts
    const friendsActivities = group.users.map(user => {
      const totalTasks = user.tasks.length;
      const checkedTasksCount = user.tasks.filter(task => task.checked).length;
      
      // Construct and return a new object for each user with the additional info
      return {
        _id: user._id,
        email: user.email,
        name: user.name,
        totalTasks: totalTasks,
        checkedTasksCount: checkedTasksCount,
      };
    });

    // Return the modified group information including detailed tasks info for each user
    res.status(200).json({ groupName: group.name, friendsActivities: friendsActivities });
  } catch (error) {
    console.error("Error fetching group information:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
module.exports = router;
/*
  group.users.forEach(user => {
    console.log(`User ${user.name} has ${user.tasks.length} tasks.`);
  });
   */
//console.log("group name: ", group.name);
    //console.log("user info: ", group.users);
   
    
     // Assuming `Task` is your model for tasks, and it has a `userId` field and a `checked` field
     /*const userTasksChecked = group.users.map(async (user) => {
      console.log("USERTASKCHECKED: ", user.tasks.filter(task => task.checked).length);
      
      const tasks = await Task.find({ userId: user._id }); // Find all tasks for the user
      const numberComplete = tasks.filter(task => task.checked).length; // Count how many of these tasks are completed
      console.log("user tasks i hope",tasks, "NUMBER COMPLETEEEEE: ",numberComplete);
      return {
        ...user._doc, // Spread the user document
        numberComplete // Add the number of completed tasks
      };
   });
      
*/

/*
router.get("/groupInfo", async (req, res) => {
  const { groupId } = req.query;

  try {
    const group = await Group.findById(groupId).populate("users");
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Assuming `Task` is your model for tasks, and it has a `userId` field and a `checked` field
    const userTasksPromises = group.users.map(async (user) => {
      const tasks = await Task.find({ userId: user._id }); // Find all tasks for the user
      const numberComplete = tasks.filter(task => task.checked).length; // Count how many of these tasks are completed

      return {
        ...user._doc, // Spread the user document
        numberComplete // Add the number of completed tasks
      };
    });

    // Wait for all the Promises to resolve
    const friendsActivities = await Promise.all(userTasksPromises);

    console.log("group name: ", group.name);
    console.log("user info: ", friendsActivities); // Updated to log friendsActivities including numberComplete

    res.status(200).json({ groupName: group.name, friendsActivities });
  } catch (error) {
    console.error("Error fetching group information:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

*/


