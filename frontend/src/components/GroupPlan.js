import React, { useState } from 'react';
import { useGroupName } from '../GroupNameContext';
import { useTasks } from '../TasksContext';

export default function GroupPlan() {
  const [newTask, setNewTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { groupName, setGroupName } = useGroupName(); 
  const { tasks, setTasks } = useTasks();

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { name: newTask, checked: false }]);
      setNewTask("");
    }
  }

  function saveTasks() {
    console.log("saving tasks for the group:", groupName)
    // Assuming the existence of an API endpoint '/api/taskupdate/update'
    fetch('http://localhost:4000/api/taskupdate/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupName: groupName,
        tasks: tasks
      }),
    })
    .then(response => response.json())
    .then(data => console.log('Tasks updated:', data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function toggleEditMode() {
    if (editMode) {
      // When exiting edit mode, save the tasks
      saveTasks();
    }
    setEditMode(!editMode);
  }

  function removeTask(indexToRemove) {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  }

  return (
    <div className="plan">
      <h2 className="section-title">
        <span>Group Plan</span>
        <span className="date-span">{dateString}</span>
      </h2>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task.name}</span>
            {editMode && (
              <button onClick={() => removeTask(index)}>Remove</button>
            )}
          </li>
        ))}
      </ol>
      {editMode && (
        <div>
          <input
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="add-button" onClick={addTask}>Add</button>
        </div>
      )}
      <button className="edit-button" onClick={toggleEditMode}>
        {editMode ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}
