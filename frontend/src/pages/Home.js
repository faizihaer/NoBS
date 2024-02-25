import React from "react";
import "../css-stylings/Home.css";

const Home = () => {
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
            <button className="nudge-button">Nudge Me</button>
          </div>
        </div>
        <div className="friend">
          <div className="activity-info">
            <span className="friend-name">Rob</span>
            <span className="activity">Ran 20 Min, Swam</span>
          </div>
          <div className="activity-actions">
            <span className="activity-progress">2/3</span>
            <button className="nudge-button">Nudge Me</button>
          </div>
        </div>
        <div className="friend">
          <div className="activity-info">
            <span className="friend-name">Tom</span>
            <span className="activity">No activity yet</span>
          </div>
          <div className="activity-actions">
            <span className="activity-progress">0/3</span>
            <button className="nudge-button">Nudge Me</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
