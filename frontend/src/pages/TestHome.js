import React, { useState } from "react";
import "../css-stylings/TestHome.css";
import FriendActivity from "../components/FriendActivity";
import GroupPlan from "../components/GroupPlan";
import DailyTasks from "../components/DailyTasks";
import { useAuth } from "../AuthService";
import Navbar from "../components/Navbar";

const TestHome = () => {

    return(
        <div>
            <div className="welcomebox"> 
                <span style={{ fontSize: '4em', fontFamily: 'NohemiNormal' }}>
                        Welcome, 
                        <span style={{ fontWeight: 'bold', fontFamily: 'NohemiSmbd' }}>
                            Will Burns
                            </span>
                        .
                    </span>
                </div>
            <div className="home">
                    <p>fart</p>
                
            </div>
        </div>
    );
}
export default TestHome;