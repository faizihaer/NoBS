const express = require("express");
const router = express.Router();
const { sendMail } = require("../nodeMailer");

router.use(express.json());

router.post("/api/email", async (req, res) => {
  // Extract email data from request body
  const { to, subject, text } = req.body;

  try {
    await sendMail({ to, subject, text });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
