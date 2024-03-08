import React from 'react';
import "../css-stylings/videohome.css";
import NoBSHome from '../assets/NoBSHome.mp4'

const VideoPlayer = () => {
    return (
      <div className='video-player-container'>
        <div className='video-player'>
          <div className="overlay"></div>
          <video src={NoBSHome} autoPlay loop muted />
        </div>
      </div>
    );
  };
  

export default VideoPlayer

