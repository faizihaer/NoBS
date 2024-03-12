const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { sendMail } = require("../nodeMailer");

router.use(express.json());
 

router.post("/", async (req, res) => {
  console.log("/byemail url 41");
  const { userEmail } = req.body;
  console.log(req.body);
  try {
    const thisUser = await User.findOne( {email: userEmail} ); 
    if (!thisUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("found user: " + thisUser._id);
    res.json({userId: thisUser._id});
  } catch (error) {
    console.error("Error finding user", error);
    res.status(500).json({ message: "Error finding user", error: error.message });
  }
});

 



module.exports = router;
