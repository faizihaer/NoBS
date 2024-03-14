import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthService";
import { useTasks } from "../TasksContext";

export default function DailyTasks() {
  const { user } = useAuth();
  const { tasks, setTasks } = useTasks(); 
  const [post, setPost] = useState(false);


  const handleCheckboxChange = (taskName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.name === taskName) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });

    setTasks(updatedTasks); // Update tasks state globally
  };
  const handlePostButtonClick = () => {
    setPost(true);

    setTimeout(() => {
        setPost(false);
    }, 500);
};
  console.log(tasks);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Daily Tasks</h2>
      </div>
      <div
        className="task-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {tasks.map((task, index) => (
          <div
            key={index}
            className="task"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="checkbox"
              id={`task-${index}`}
              checked={task.checked || false}
              onChange={() => handleCheckboxChange(task.name)}
              style={{ marginRight: "8px" }}
            />
            <label htmlFor={`task-${index}`}>{task.name}</label>
          </div>
        ))}
      </div>
      <button className="post-button" onClick={handlePostButtonClick} style={{backgroundColor: post ? "#097312" : "" }}>Post</button>
    </div>
  );
}
