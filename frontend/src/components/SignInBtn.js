import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../AuthService"; // Import the useAuth hook
import { Routes, Route, useNavigate } from "react-router-dom";
import Group from "../pages/Group";
import Home from "../pages/Home";

export default function SignInBtn() {
  const { user, handleCallbackResponse } = useAuth();
  const navigate = useNavigate();
  const [groupId, setUserGroupId] = useState(null);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, [handleCallbackResponse]);

  useEffect(() => {
    const fetchUserGroupId = async () => {
      try {
        // Wait for 1 second so that api gets called before the frontend
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch("http://localhost:4000/api/byemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.email }),
        });
        const result = await response.json();
        console.log("groupId =", result.groupId);

        setUserGroupId(result.groupId);

        // Redirect when user is authenticated
        if (user && Object.keys(user).length !== 0) {
          // Check if user is already in a group
          if (result.groupId === null || result.groupId === undefined) {
            console.log("User is not yet in a group");
            navigate("/Group"); // Redirect new users to Group page
          } else {
            console.log("User is already in a group");
            navigate("/Home"); // Redirect existing users to Home page
          }
        }
      } catch (error) {
        console.error("Error fetching user group ID:", error.message);
        // Handle error as needed
      }
    };

    fetchUserGroupId();
  }, [user, navigate]);

  return (
    <div className="centered-container">
      <AuthProvider>
        <div id="signInDiv"></div>
        <Routes>
          <Route path="/Group" element={<Group />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
