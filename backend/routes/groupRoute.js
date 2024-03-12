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
        return res.status(400).json({ message: "Group with this name already exists" });
      }
      // Create a new group
      const newGroup = new Group({ name });
      await newGroup.save();
      // Oh, if only you knew the effort that went into these next three lines! passing in the userId here proved more than useful, allowing the user's group variable to be updated as soon as the group is created
      const user = await User.findOne({ _id: userId} );
      user.group = newGroup;
      await user.save();

      // Add the creator (assuming they are the user making the request) to the group
      newGroup.users.push(userId);
      await newGroup.save();

      res.status(200).json({ message: "Group created successfully", group: newGroup });
    } else if (action === "joinGroup") {
      const existingGroup = await Group.findOne({ name: name });
      if (existingGroup) {
        // Add the creator (assuming they are the user making the request) to the group
        existingGroup.users.push(userId);
        await existingGroup.save();
        // second use of these three lines, just for adding to an existing group. How did I not think of that sooner?
        const user = await User.findOne({ _id: userId} );
        user.group = existingGroup;
        await user.save();
        res.status(200).json({ message: "Group joined successfully" });
        console.log("Group joined successfully");
      }
      console.log("Group not successfully joined");
      return res.status(404).json({ message: "Group not found" }); //404 not found
    } else {
      // Handle other cases or invalid actions
      res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


module.exports = router;