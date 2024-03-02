import React from "react";
import '../css-stylings/Fonts/Nohemi-Thin.css';
import "../css-stylings/About.css";
import VideoPlayer from "../components/videoplayer"; // Assuming VideoPlayer component path

const MotivationalComponent = () => {
  const containerStyle = {
    padding: '80px 200px 200px',
    position: 'relative',
    marginTop: '60px',
    
  };

  const textContainerStyle = {
    flex: 1,
    padding: '40px', // Adjust padding to avoid text overlap
    zIndex: 2,
    position: 'relative',
    color: 'white',
  };

  const triangleStyle = {
    padding: '-100px',
    position: 'absolute',
    top: 0,
    right: '-0px', // Adjust right to control the starting point of the triangle
    width: 0,
    height: 0,
    borderLeft: '500px solid transparent',
    borderBottom: '800px solid  #8ac1ed',  // Adjust dimensions and color as needed
    zIndex: 10000,
  };

  const factsStyle = {
    marginTop: '40px', // Adjust margin to create space between text and facts
    color: 'white',
    fontSize: '20px',
    lineHeight: '2.5',
  };

  const titlestyle = {
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h1>Unlock Your Potential</h1>
        <p>Your journey to greatness begins now. Embrace the possibilities within.</p>
        <div style={factsStyle}>
          <h2 style={titlestyle}>Facts About NoBS:</h2>
          <ul>
            <li>NoBS features a helpful AI Chatbot to assist users in their fitness journey. 🤖</li>
            <li>NoBS is designed to provide users with a platform to encourage group motivation. 🚀</li>
            <li>It helps users set personalized fitness goals and track their progress. 📊</li>
            <li>Join thousands of users who have transformed their lives through NoBS. 💪</li>
            <li>NoBS offers a supportive community where users can share tips and achievements. 🤝</li>
          </ul>
        </div>
      </div>
      <div style={triangleStyle}></div>
    </div>
  );
};

const About = () => {
  return (
    <>
     <VideoPlayer />
      <MotivationalComponent />
      <div className="about" id="about2">
        <header className="header">
          <h1>About NoBS</h1>
          <p>Your journey to a healthier lifestyle starts here!</p>
          <p>
            Fitness goals are a large part of many lives, yet many individuals
            frequently encounter difficulties in finding a reliable mechanism to
            stay on track. This challenge is magnified when these goals conflict
            with educational pursuits or career milestones. NoBS caters to
            increasing self-discipline and personal accountability through
            creation of personalized fitness regimes, collaboration with friends,
            and fun ways to share progress and stay motivated.
          </p>
          <p>Thank you for choosing NoBS to embark on your fitness journey</p>
        </header>
      </div>
    </>
  );
};

export default About;
