import React, { useState } from "react";
import "../css-stylings/Home.css";
import FriendActivity from "../components/FriendActivity";
import GroupPlan from "../components/GroupPlan";
import DailyTasks from "../components/DailyTasks";
import { useAuth } from "../AuthService";
import { TasksProvider } from "../TasksContext";


const Home = () => {
  const [ShowPopUpSecond, setShowPopUpSecond] = useState(false);
  const [ShowPopUpHourly, setShowPopUpHourly] = useState(false);
  
  //const { user, groupId } = useAuth(); once we have group id;
  const { user } = useAuth();

  return (
    <TasksProvider>
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
      
    </div>
    </TasksProvider>
  );
};

export default Home;
/*
<section className="Friend Activity">
        <FriendActivity
          user={user}
          ShowPopUpSecond={ShowPopUpSecond}
          setShowPopUpSecond={setShowPopUpSecond}
          ShowPopUpHourly={ShowPopUpHourly}
          setShowPopUpHourly={setShowPopUpHourly}
        />
      </section>
*/