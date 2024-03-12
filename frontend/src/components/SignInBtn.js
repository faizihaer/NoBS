import { useEffect } from "react";
import { AuthProvider, useAuth } from "../AuthService"; // Import the useAuth hook
import { Routes, Route, useNavigate } from "react-router-dom";
import Group from "../pages/Group";

export default function SignInBtn() {
  const { user, handleCallbackResponse, handleSignOut } = useAuth();
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
    // Redirect when user is authenticated
    if (user && Object.keys(user).length !== 0) {
      navigate("/Group");
    }
  }, [user, navigate]);

  return (
    <div className="centered-container">
      <AuthProvider>
        <div id="signInDiv"></div>
        <Routes>
          <Route path="/Group" element={<Group />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
