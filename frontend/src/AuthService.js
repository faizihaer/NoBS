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
  const [hasEnteredGroup, setHasEnteredGroup] = useState(false);
  
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
  };
  const handleSignOut = () => {
    setUser({});
    setLoggedIn(false);
    const signInDiv = document.getElementById("signInDiv");
    if (signInDiv) {
      signInDiv.hidden = false;
    }
  };
  // Function to call when a group ID is entered
  const enterGroup = () => setHasEnteredGroup(true);
  return (
    <AuthContext.Provider
      value={{ user, handleCallbackResponse, handleSignOut, isLoggedIn, hasEnteredGroup, enterGroup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
