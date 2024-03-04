import React, { useRef, useState } from "react";
import "../css-stylings/Home.css";
import FriendActivity from "../components/FriendActivity";
import GroupPlan from "../components/GroupPlan";

import { useAuth } from "../AuthService";

function DailyTasks({tasks, setTasks}){
  const [checkedTasks, setCheckedTasks] = useState(new Array(tasks.length).fill(false));

  const handleCheckboxChange = index => {
    const updatedCheckedTasks = [...checkedTasks];
    updatedCheckedTasks[index] = !updatedCheckedTasks[index];
    setCheckedTasks(updatedCheckedTasks);
  };
  console.log(checkedTasks)
  return (
    <div>
      <h2 className="section-title">Daily Tasks</h2>
      <div className="task-container">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <input 
              type="checkbox" 
              id={task} 
              checked={checkedTasks[index]}
              onChange={() => handleCheckboxChange(index)} 
            />
            <label htmlFor={task}>{task}</label>
          </div>
        ))}
      </div>
      <button className="post-button">Post</button>
    </div>
  );
 
}


const Home = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [tasks, setTasks] = useState([]);
  //const { user, groupId } = useAuth(); once we have group id;
  const { user } = useAuth();
  

  return (
    <div className="home">
      <header className="header">
        <h1>Welcome, {user.name}!</h1>
      </header>

      <section className="plan">
       <GroupPlan tasks = {tasks} setTasks={setTasks}/>
      </section>

      <section className="daily-tasks">
       <DailyTasks tasks = {tasks} setTasks={setTasks}/>
      </section>
      <section className="Friend Activity">
      <FriendActivity user={user} showPopUp={showPopUp} setShowPopUp={setShowPopUp} tasks = {tasks} />
        </section>
    </div>

  );
};

export default Home;
