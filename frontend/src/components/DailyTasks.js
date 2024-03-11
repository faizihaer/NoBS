import React from 'react';
import { useAuth } from '../AuthService';
import { useTasks } from '../TasksContext'; // Ensure useTasks correctly imports tasks and setTasks

export default function DailyTasks() {
  const { user } = useAuth();
  const { tasks, setTasks } = useTasks(); // Utilize tasks and setTasks from context directly

  const handleCheckboxChange = (taskName) => {
    const updatedTasks = tasks.map(task => {
      if (task.name === taskName) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });

    setTasks(updatedTasks); // Update tasks state globally
  };
  console.log(tasks);
  const labelStyle = {

    color: 'white', 
    padding: '5px', // Add some padding to make the label visibl
    marginLeft: '8px', // Ensure some space between the checkbox and the label
    display: 'inline-block', // Make sure the label is treated as an inline element with block features
    minWidth: '100px', // Give a minimum width for the label
    textAlign: 'left' // Align the text to the left
  };

  return (
    <div>
    <div>
    <h2 className="section-title">
        <span> type shit</span>
    </h2>
    </div>
      <div className="task-container" style={{ display: 'flex', flexDirection: 'column' }}>
        {tasks.map((task, index) => (
          <div key={index} className="task" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="checkbox"
              id={`task-${index}`}
              checked={task.checked || false}
              onChange={() => handleCheckboxChange(task.name)}
              style={{ marginRight: '8px' }}
            />
            <label htmlFor={`task-${index}`} style={labelStyle}>{task.name}</label>
          </div>
        ))}
      </div>
      <button className="post-button" >Post</button>
    </div>
  );
}
