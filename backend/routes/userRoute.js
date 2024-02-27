const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    // If user doesn't exist, create a new user
    if (!user) {
      user = new User({ name, email });
      await user.save();
    }

    res.status(200).json({ message: "User authenticated successfully", user });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res
      .status(500)
      .json({ message: "Error authenticating user", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
});

module.exports = router;
