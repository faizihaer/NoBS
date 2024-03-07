import axios from "axios";

const nudgeEmail = async (
  senderUser,
  targetUser,
  lastClickTime,
  setShowPopUp
) => {
  const currentTime = new Date();

  const options = {
    from: process.env.REACT_APP_EMAIL_USERNAME,
    to: targetUser.email, // Change here to targetUser.email
    subject: "Nudge Alert: You're Getting a Boost from " + senderUser.name,
    text: `Hi ${targetUser.name}, \n\nYou're receiving a friendly nudge from ${senderUser.name} to help you stay on track with your fitness goals! \n\nIt's time to put an end to the excuses and get ready to sweat it out. Let's crush those workouts and make progress towards your goals.`,
  };

  if (!lastClickTime || currentTime - lastClickTime >= 3600000) {
    try {
      await axios.post("http://localhost:4000/api/email", options);
      console.log("Email sent successfully");
      return currentTime; // Return current time for setting last click time
    } catch (error) {
      console.error("Error sending email:", error);
    }
  } else {
    setShowPopUp(true);
    setTimeout(() => setShowPopUp(false), 1000);
    console.log("You can only nudge once per hour");
  }
};

export default nudgeEmail;
