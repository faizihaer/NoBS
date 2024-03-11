import React from "react";
import SignInBtn from "../components/SignInBtn";
import "../css-stylings/Auth.css";

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="white-box">
        <h2 className="welcome-text">Welcome Back!</h2>
      </div>
      <div className="sign-in-button-container">
        <SignInBtn />
      </div>
    </div>
  );
};
export default Auth;