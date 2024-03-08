import { useState, createContext, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Create a context
const AuthContext = createContext();

// Export a hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  const handleCallbackResponse = (response) => {
    var userObject = jwtDecode(response.credential);
    axios
      .post("http://localhost:4000/api/user", {
        name: userObject.name,
        email: userObject.email,
      })
      .then((response) => {
        console.log("User saved successfully:", response.data);

        //document.getElementById("signInDiv").hidden = true;
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
    setLoggedIn(true);
    setUser(userObject);
  };
  const handleSignOut = () => {
    setUser({});
    setLoggedIn(false);
    // document.getElementById("signInDiv").hidden = false;
  };

  return (
    <AuthContext.Provider
      value={{ user, handleCallbackResponse, handleSignOut, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
