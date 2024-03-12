import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [isLoggedIn, setLoggedIn] = useState(
    user && Object.keys(user).length > 0
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCallbackResponse = (response) => {
    var userObject = jwtDecode(response.credential);
    axios
      .post("http://localhost:4000/api/user", {
        name: userObject.name,
        email: userObject.email,
      })
      .then((response) => {
        console.log("User saved successfully:", response.data);
        const signInDiv = document.getElementById("signInDiv");
        if (signInDiv) {
          signInDiv.hidden = true;
        }
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
    setLoggedIn(true);
    setUser(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser({});
    setLoggedIn(false);
    const signInDiv = document.getElementById("signInDiv");
    if (signInDiv) {
      signInDiv.hidden = false;
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, handleCallbackResponse, handleSignOut, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
