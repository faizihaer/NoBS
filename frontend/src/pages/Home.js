import React, { useState } from "react";
import "../css-stylings/Home.css";
import axios from "axios";

const Home = () => {
  const [lastClickTime, setLastClickTime] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  const nudgeEmail = async () => {
    const currentTime = new Date();

    const options = {
      from: process.env.REACT_APP_EMAIL_USERNAME,
      to: "USEREMAIL@gmail.com",
      subject: "Welcome to NoBS, where you can stop your BS and get to work",
      text: "Get Ready to work out",
    };

    if (!lastClickTime || currentTime - lastClickTime >= 3600000) {
      try {
        await axios.post("http://localhost:4000/api/email", options);
        setLastClickTime(currentTime);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    } else {
      setShowPopUp(true);
      setTimeout(() => setShowPopUp(false), 3000);
      console.log("You can only nudge once per hour");
    }
  };

  return (
    <div className="home">
      <header className="header">
        <h1>Welcome, USERNAME!</h1>
      </header>

      <section className="plan">
        <h2 className="section-title">Your Plan</h2>
        <textarea
          className="textarea"
          placeholder="Create your plan now! Need help? Use our personal AI Chatbot."
          rows={4}
          cols={40}
        ></textarea>
        <button className="edit-button">Edit</button>
      </section>

      <section className="daily-tasks">
        <h2 className="section-title">Your Daily Tasks</h2>
        <div className="task-container">
          <div className="task">
            <input type="checkbox" id="bench" />
            <label htmlFor="bench">Bench Press</label>
          </div>
          <div className="task">
            <input type="checkbox" id="run" />
            <label htmlFor="run">Run 20 Min</label>
          </div>
          <div className="task">
            <input type="checkbox" id="swim" />
            <label htmlFor="swim">Swim</label>
          </div>
        </div>
        <button className="post-button">Post</button>
      </section>

      <section className="friend-activity">
        <h2 className="section-title">Friend Activity</h2>
        <div className="friend">
          <div className="activity-info">
            <span className="friend-name">Bob</span>
            <span className="activity">Benched, Ran 20 Min</span>
          </div>
          <div className="activity-actions">
            <span className="activity-progress">2/3</span>
            <button className="nudge-button" onClick={nudgeEmail}>
              Nudge Me
            </button>
          </div>
        </div>
        <div className="friend">
          <div className="activity-info">
            <span className="friend-name">Rob</span>
            <span className="activity">Ran 20 Min, Swam</span>
          </div>
          <div className="activity-actions">
            <span className="activity-progress">2/3</span>
            <button className="nudge-button" onClick={nudgeEmail}>
              Nudge Me
            </button>
          </div>
        </div>
        <div className="friend">
          <div className="activity-info">
            <span className="friend-name">Tom</span>
            <span className="activity">No activity yet</span>
          </div>
          <div className="activity-actions">
            <span className="activity-progress">0/3</span>
            <button className="nudge-button" onClick={nudgeEmail}>
              Nudge Me
            </button>
          </div>
        </div>
      </section>
      {showPopUp && (
        <div className="popup">
          <p>You can only nudge once per hour</p>
        </div>
      )}
    </div>
  );
};

export default Home;
