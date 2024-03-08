import React, { useState } from "react";
import "../css-stylings/Home.css";
import FriendActivity from "../components/FriendActivity";
import GroupPlan from "../components/GroupPlan";
import DailyTasks from "../components/DailyTasks";
import { useAuth } from "../AuthService";

const Home = () => {
  const [ShowPopUpSecond, setShowPopUpSecond] = useState(false);
  const [ShowPopUpHourly, setShowPopUpHourly] = useState(false);
  const [tasks, setTasks] = useState([]);
  //const { user, groupId } = useAuth(); once we have group id;
  const { user } = useAuth();

  return (
    <div className="home">
      <header className="header">
        <h1>Welcome, {user.name}!</h1>
      </header>

      <section className="plan">
        <GroupPlan tasks={tasks} setTasks={setTasks} />
      </section>

      <section className="daily-tasks">
        <DailyTasks tasks={tasks} setTasks={setTasks} />
      </section>
      <section className="Friend Activity">
        <FriendActivity
          user={user}
          ShowPopUpSecond={ShowPopUpSecond}
          setShowPopUpSecond={setShowPopUpSecond}
          ShowPopUpHourly={ShowPopUpHourly}
          setShowPopUpHourly={setShowPopUpHourly}
          tasks={tasks}
        />
      </section>
    </div>
  );
};

export default Home;
