import { useEffect, useState } from "react";
import "../css-stylings/SignInBtn.css"; // Import CSS file for styling
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function SignInBtn() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    //console.log(userObject);

    // Send user data to backend API
    axios
      .post("http://localhost:4000/api/route", {
        name: userObject.name,
        email: userObject.email,
      })
      .then((response) => {
        console.log("User saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });

    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

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
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}
