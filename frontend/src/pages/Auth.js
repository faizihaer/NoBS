import React from "react";
import SignInBtn from "../components/SignInBtn";
import "../css-stylings/Auth.css";

const Auth = () => {
  return (
    <div>
      <div className="paper">
        <div>
          <SignInBtn />
        </div>
      </div>
    </div>
  );
};

export default Auth;
