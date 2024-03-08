// backend/routes/groupRoute.js
const express = require("express");
const router = express.Router();
const Group = require("../models/group");

router.post("/Group", async (req, res) => {
  const { name, action, userId } = req.body;
  try {
    // Logic based on the action parameter
    if (action === "createGroup") {
      
      // Logic for creating a new group
      const { groupName } = name;
      const existingGroup = await Group.findOne({ groupName });
      if (existingGroup) {
        // If a group with the same name exists, send an error response
        return res.status(400).json({ message: "Group with this name already exists" });
      }

      // Create a new group
      const newGroup = new Group({ groupName });
      await newGroup.save();

      // Add the creator (assuming they are the user making the request) to the group
      newGroup.users.push(userId);
      await newGroup.save();

      res.status(200).json({ message: "Group created successfully", group: newGroup });
    } else if (action === "joinGroup") {
      const { groupName } = name;
      const existingGroup = await Group.findOne({ groupName });
      if (existingGroup) {
        // Add the creator (assuming they are the user making the request) to the group
        existingGroup.users.push(userId);
        await existingGroup.save();
        res.status(200).json({ message: "Group joined successfully" });
      }
      return res.status(400).json({ message: "Group not found" });
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