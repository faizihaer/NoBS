import { useEffect } from "react";
import "../css-stylings/SignInBtn.css";
import { AuthProvider, useAuth } from "../AuthService"; // Import the useAuth hook
import Auth from "../pages/Auth";

export default function SignInBtn() {
  const { user, handleCallbackResponse, handleSignOut } = useAuth();

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

  return (
    <div className="centered-container">
      <AuthProvider>
        <div id="signInDiv"></div>
        {user && Object.keys(user).length !== 0 ? (
          <div className="welcome-container">
            <h1>Welcome, {user.name}</h1>
            <div className="profile-circle">
              <img src={user.picture} alt="User profile" />
            </div>

            <div className="groupSelection">
              <h2>Enter a Group ID or Create a New Group to join NoBS!</h2>
              <div className="input-container">
                <label htmlFor="groupId">Group ID:</label>
                <input type="text" id="groupId" placeholder="Enter Group ID" />
                <button className="submit-button">Submit</button>
              </div>

              <button className="create-group-button">Create a Group</button>
            </div>
          </div>
        ) : null}
      </AuthProvider>
    </div>
  );
}
