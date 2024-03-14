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
        subject: "Welcome to NoBS - Let's Get Started on Your Fitness Journey!",
        text: `Hi ${name}, \n\nWelcome to NoBS – the platform where excuses have no place, and results are the only outcome we're after! \n Whether you're looking to shed a few pounds, build muscle, or simply improve your overall health and wellness, our platform is designed to provide you with the tools, resources, and encouragement you need to reach your goals. `,
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
