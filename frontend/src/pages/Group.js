import React, { useEffect, useState } from "react";
import "../css-stylings/SignInBtn.css";
import { AuthProvider, useAuth } from "../AuthService";
import axios from "axios";
import { Link } from "react-router-dom";
import NoBSHome from '../assets/WomanPull.mp4'

const GroupPage = () => {
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);
  //useEffect for getting the user ID as "userId"
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user", {
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if needed
          },
          body: JSON.stringify({ userEmail: user.email }),
        });
        if (!response.data) {
          throw new Error("No user data received");
        }

        setUserId(response);
        console.log("UserId =", response);
      } catch (error) {
        console.error("Error fetching user ID:", error.message);
        // Handle error as needed
      }
    };

    fetchUserId();
  }, []);
  //create and join group functions
  async function createGroup({input}) {
    //passes 'input' in, should contain the group name
    try {
      const groupName = input;

      const response = await fetch('http://localhost:4000/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'createGroup', name: groupName, userId: userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      // Handle the response as needed (update UI, display messages, etc.)
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async function joinGroup({input}) {
    try {
      const groupName = input;

      const response = await fetch('http://localhost:4000/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'joinGroup', name: groupName, userId: userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      // Handle the response as needed (update UI, display messages, etc.)
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return (
<div className="container">
  <div className="welcome-container">
    <h1>Welcome, {user.name}</h1>
  </div>
  
  <div className="profile-circle">
    <video src={NoBSHome} autoPlay loop muted />
  </div>
  <div className ="text">
    <h2>Begin your fitness journey by joining a group or making your own!</h2>
  </div>
  <div className="input-container">
    <input type="text" id="groupId" placeholder="Enter Group ID" />
    <div className="button-container">
      <Link to="/Home">
        {/* This button should call createGroup, which will create a group with this name or display an error message saying a group already has that name */}
        <button className="join-group-button" onClick={() => joinGroup({input: document.getElementById("groupId").value})}>Join</button>
      </Link>
      <Link to="/Home">
        {/* This button should call joinGroup, which will add the user to the group with this name or display an error message saying no group exists with that name */}
        <button className="create-group-button"onClick={() => createGroup({input: document.getElementById("groupId").value})}>Create</button>
      </Link>
    </div>
  </div>
</div>
  );
};

export default GroupPage;
