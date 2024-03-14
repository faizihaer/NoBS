// backend/routes/groupRoute.js
const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const User = require("../models/user");

router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId);
    //console.log("USERSUSERUSER::", user.tasks);

    res.json(user.tasks);
  } catch (error) {
    console.error("Error getting users:", error);
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
});
module.exports = router;
