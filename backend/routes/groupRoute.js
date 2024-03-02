const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Group = require('../models/group'); 

// Route to handle requests for a random group ID
router.get('/', async (req, res) => {
  try {
    // Retrieve the user ID from the request parameters or session
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not logged in' });
    }

    // Query the database to find the user's group ID
    const user = await User.findById(userId);

    //Can't find our user then error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new random group ID using Types from mongo
    const randomGroupId = mongoose.Types.ObjectId();

    // Send the random group ID as a response
    res.status(200).json({ groupId: randomGroupId });
  } catch (error) {
    console.error('Error generating group ID:', error);
    res.status(500).json({ message: 'Error generating group ID', error: error.message });
  }
});

module.exports = router;


