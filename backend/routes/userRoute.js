const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { sendMail } = require("../nodeMailer");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    // If user doesn't exist, create a new user and send a Welcome email
    if (!user) {
      user = new User({ name, email });
      await user.save();

      // Send a welcome email
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Welcome to NoBS",
        text: `Hi ${name}, Welcome to NoBS! Where you can stop your BS and get to work`,
      };
      await sendMail(mailOptions);
    }

    res.status(200).json({ message: "User authenticated successfully", user });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res
      .status(500)
      .json({ message: "Error authenticating user", error: error.message });
  }
});

//Error here: won't recognize 
router.get("/.*email$/", async (req, res) => {
  console.log("/byemail url 41");
  const { userEmail } = req.body;
  try {
    const thisUser = await User.findOne( {email: userEmail} ); 
    if (!thisUser) {
      return res.status(404).json({ message: "User not found" });
    }
console.log("found user: " + thisUser._id);
    res.json(thisUser._id);
  } catch (error) {
    console.error("Error finding user", error);
    res.status(500).json({ message: "Error finding user", error: error.message });
  }
});

router.get("/", async (req, res) => {
  console.log("/user url 56");
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
