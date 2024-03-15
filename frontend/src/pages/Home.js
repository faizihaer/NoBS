import React, { useState } from "react";
import "../css-stylings/Home.css";
import FriendActivity from "../components/FriendActivity";
import GroupPlan from "../components/GroupPlan";
import DailyTasks from "../components/DailyTasks";
import { useAuth } from "../AuthService";
import { TasksProvider } from "../TasksContext";
import Dashboard from '../assets/Dashboard.jpg';

const Home = () => {
  const [ShowPopUpSecond, setShowPopUpSecond] = useState(false);
  const [ShowPopUpHourly, setShowPopUpHourly] = useState(false);

  const { user } = useAuth();

  return (
    <TasksProvider>
      <div className="background-container">
        <img src={Dashboard} alt="Dashboard" className="background-image" />
        <div className="home">
          <header className="header">
            <h1>Welcome, {user.name}!</h1>
          </header>

          <section className="plan">
            <GroupPlan />
          </section>

          <section className="daily-tasks">
            <DailyTasks />
          </section>
          <section className="Friend Activity">
            <FriendActivity
              user={user}
              ShowPopUpSecond={ShowPopUpSecond}
              setShowPopUpSecond={setShowPopUpSecond}
              ShowPopUpHourly={ShowPopUpHourly}
              setShowPopUpHourly={setShowPopUpHourly}
            />
          </section>
        </div>
      </div>
    </TasksProvider>
  );
};

export default Home;
