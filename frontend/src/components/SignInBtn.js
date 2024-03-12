import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../AuthService"; // Import the useAuth hook
import { Routes, Route, useNavigate } from "react-router-dom";
import Group from "../pages/Group";
import Home from "../pages/Home";

export default function SignInBtn() {
  const { user, handleCallbackResponse } = useAuth();
  const navigate = useNavigate();

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
    if (user && Object.keys(user).length !== 0) {
      navigate("/Group");
    }

    // // Redirect when user is authenticated
    // if (user && Object.keys(user).length !== 0) {
    //   // Check if user exists in the database
    //   if (user.Group === null) {
    //     console.log("User is new");
    //     navigate("/Group"); // Redirect new users to Group page
    //   } else {
    //     console.log("User exists");
    //     navigate("/Home"); // Redirect existing users to Home page
    //   }
    // }
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
