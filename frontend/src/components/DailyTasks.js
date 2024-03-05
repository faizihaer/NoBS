import React, {useState, useEffect} from 'react';

export default function DailyTasks({tasks, setTasks}){
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
  