import axios from "axios";

const nudgeEmail = async (
  senderUser,
  targetUser,
  lastClickTime,
  nudgesSent,
  setNudgesSent,
  setShowPopUpSecond,
  setShowPopUpHourly
) => {
  const currentTime = new Date();

  const options = {
    from: process.env.REACT_APP_EMAIL_USERNAME,
    to: targetUser.email, // Change here to targetUser.email
    subject: "Nudge Alert: You're Getting a Boost from " + senderUser.name,
    text: `Hi ${targetUser.name}, \n\nYou're receiving a friendly nudge from ${senderUser.name} to help you stay on track with your fitness goals! \n\nIt's time to put an end to the excuses and get ready to sweat it out. Let's crush those workouts and make progress towards your goals.`,
  };

  if (!lastClickTime || currentTime - lastClickTime >= 3600000) {
    setNudgesSent(1); // Reset nudges sent to 1
    try {
      await axios.post("http://localhost:4000/api/email", options);
      console.log("Email sent successfully");
      return currentTime;
    } catch (error) {
      console.error("Error sending email:", error);
    }
  } else if (nudgesSent < 3) {
    // If within the hour and nudges sent are less than 3
    if (currentTime - lastClickTime >= 4000) {
      // If been more than 5 seconds since last nudge
      try {
        await axios.post("http://localhost:4000/api/email", options);
        console.log("Email sent successfully");
        setNudgesSent(nudgesSent + 1);
        return currentTime;
      } catch (error) {
        console.error("Error sending email:", error);
      }
    } else {
      setShowPopUpSecond(true);
      setTimeout(() => setShowPopUpSecond(false), 4000);
      console.log("Please wait 4 seconds before nudging again");
    }
  } else {
    setShowPopUpHourly(true);
    setTimeout(() => setShowPopUpHourly(false), 4000);
    console.log("You can only nudge three times per hour");
  }
};

export default nudgeEmail;
