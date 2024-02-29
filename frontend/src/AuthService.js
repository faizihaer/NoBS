import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const [user, setUser] = useState({});

  const handleCallbackResponse = (response) => {
    var userObject = jwtDecode(response.credential);
    axios.post("http://localhost:4000/api/route", {
      name: userObject.name,
      email: userObject.email,
    }).then((response) => {
      console.log("User saved successfully:", response.data);
    }).catch((error) => {
      console.error("Error saving user:", error);
    });

    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  };

  const handleSignOut = () => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  return { user, handleCallbackResponse, handleSignOut };
};
