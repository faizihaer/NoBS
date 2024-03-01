import React, { useRef, useState } from "react";
import "../css-stylings/Home.css";
import nudgeEmail from "../components/nudgeEmail";

const Home = () => {
  const [lastClickTime, setLastClickTime] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [planText, setPlanText] = useState("");
  const planTextareaRef = useRef(null);

  // Handle nudge button click
  const handleNudgeClick = async () => {
    const newLastClickTime = await nudgeEmail(lastClickTime, setShowPopUp);
    if (newLastClickTime) {
      setLastClickTime(newLastClickTime);
    }
  };

  //Editing button for the plan
  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
    if (planTextareaRef.current) {
      setPlanText(planTextareaRef.current.value);
    }
  };

  //Saving button for the plan
  const handleSaveClick = () => {
    setIsEditing(false); // Disable editing mode
    console.log("Updated Plan:", planText);
  };

  return (
    <div className="home">
      <header className="header">
        <h1>Welcome, USERNAME!</h1>
      </header>

      <section className="plan">
        <h2 className="section-title">Your Plan</h2>
        {isEditing ? (
          <textarea
            ref={planTextareaRef}
            className="textarea"
            rows={4}
            cols={40}
            value={planText}
            onChange={(e) => setPlanText(e.target.value)}
          ></textarea>
        ) : (
          <textarea
            className="textarea"
            rows={4}
            cols={40}
            value={planText}
            readOnly
          ></textarea>
        )}
        {isEditing ? (
          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        )}
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
            <button className="nudge-button" onClick={handleNudgeClick}>
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
            <button className="nudge-button" onClick={handleNudgeClick}>
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
            <button className="nudge-button" onClick={handleNudgeClick}>
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
