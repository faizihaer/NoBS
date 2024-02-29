import React from "react";
import { useAuth } from "../AuthService";

function SignOutButton() {
  const { handleSignOut } = useAuth();

  return (
    <button onClick={handleSignOut} className="logbtn">
      Sign Out
    </button>
  );
}

export default SignOutButton;
