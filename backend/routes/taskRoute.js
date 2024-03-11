const express = require("express");
const router = express.Router();
const Group = require("../models/group");


router.post('/update', async (req, res) => {
    const { groupName, tasks } = req.body;
  
    try {
      // Find the group by name and update its tasks
      const updatedGroup = await Group.findOneAndUpdate(
        { name: groupName },
        { $set: { tasks: tasks } },
        { new: true, upsert: true } // Option to create a new document if one doesn't exist
        //The new: true option specifies that the function should return the modified document rather than the original (pre-update) document
      );
  
      res.status(200).json(updatedGroup);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;