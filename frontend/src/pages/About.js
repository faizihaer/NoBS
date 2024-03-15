import React, { useEffect } from "react";
import "../css-stylings/Fonts/Nohemi-Thin.css";
import "../css-stylings/About.css";
import VideoPlayer from "../components/videoplayer"; 

const MotivationalComponent = () => {
  const containerStyle = {
    padding: "80px 90px 100px",
    position: "relative",
    marginTop: "80px",
    // color: 'white',
    fontSize: "90px",
  };



  const textContainerStyle = {
    flex: 1,
    marginTop: "50px !important",
    padding: "50px", 
    zIndex: 2,
    position: "relative",
    color: "var(--text_color)",
    fontSize: "20px",
  };

  const factsStyle = {
    marginTop: "30px", 
    // color: 'white',
    fontSize: "30px",
    lineHeight: "2.5",
  };

  const titlestyle = {
    // color: 'white',
    fontSize: "40px",
  };

  const unlockpotentialstyle = {
    fontSize: "30px",
    marginBottom: "20px",
  };

 
// wanted to add more css here but didnt know what to put :(
  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <div style={unlockpotentialstyle}>
          <h1 style={{ fontSize: "60px" }}>Unlock Your Potential</h1>
        </div>
        <h2 style={{ marginTop: "50px" }}>
          Your journey to greatness begins now. Embrace the possibilities
          within.
        </h2>
      
        <div style={factsStyle}>
          <h2 style={titlestyle}>Facts About NoBS:</h2>
          <ul>
            <li>
              NoBS features a helpful AI Chatbot to assist users in their
              fitness journey. 🤖
            </li>
            <li>
              NoBS is designed to provide users with a platform to encourage
              group motivation. 🚀
            </li>
            <li>
              It helps users set personalized fitness goals and track their
              progress. 📊
            </li>
            <li>
              Join thousands of users who have transformed their lives through
              NoBS. 💪
            </li>
            <li>
              NoBS offers a supportive community where users can share tips and
              achievements. 🤝
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
};

const About = () => {
// about page js for displaying the content
  return (
    <>
      <VideoPlayer />
      <MotivationalComponent />
      <div className="about" id="about2">
        <header className="header">
          <h1 className="titlestyle">About NoBS</h1>
          <h4>
            Fitness goals are a large part of many lives, yet many individuals
            frequently encounter difficulties in finding a reliable mechanism to
            stay on track. This challenge is magnified when these goals conflict
            with educational pursuits or career milestones. NoBS caters to
            increasing self-discipline and personal accountability through
            creation of personalized fitness regimes, collaboration with friends,
            and fun ways to share progress and stay motivated.
          </h4>
          <p>Thank you for choosing NoBS to embark on your fitness journey!</p>
        </header>
      </div>
    </>
  );
};

export default About;
