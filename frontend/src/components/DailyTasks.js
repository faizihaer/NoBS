import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthService';
export default function DailyTasks({ tasks }) {
  const { user } = useAuth();

  // Initialize taskStatuses with task names, checked status, and timestamp
  const [taskStatuses, setTaskStatuses] = useState(tasks.map(task => ({
    name: task,
    checked: false,
    timestamp: ''
  })));

  const handleCheckboxChange = index => {
    setTaskStatuses(taskStatuses => taskStatuses.map((task, idx) => {
      if (idx === index) {
        return {
          ...task,
          checked: !task.checked,
          timestamp: !task.checked ? new Date().toLocaleTimeString() : ''
        };
      }
      return task;
    }));
  };

  // Calculate the number of tasks yet to complete
  const tasksRemaining = taskStatuses.filter(task => !task.checked).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Daily Tasks</h2>
        <span>{tasksRemaining} tasks left</span>
      </div>
      <div className="task-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="task-column">
          {taskStatuses.map((task, index) => (
            <div className="task" key={index}>
              <input
                type="checkbox"
                id={`task-${index}`}
                checked={task.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`task-${index}`}>{task.name}</label>
            </div>
          ))}
        </div>
        <div className="time-column">
          <h3>Time Checked</h3>
          {taskStatuses.map((task, index) => (
            <div className="timestamp" key={index}>
              {task.checked ? task.timestamp : '---'}
            </div>
          ))}
        </div>
      </div>
      <button className="post-button">Post</button>
    </div>
  );
}

  

