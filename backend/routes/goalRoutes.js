// routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Define your routes here

// Example route
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
