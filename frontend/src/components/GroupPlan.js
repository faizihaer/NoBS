import React, { useState, useEffect } from "react";

export default function GroupPlan({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const currentDate = new Date();

  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long", // "Monday"
    year: "numeric", // "2024"
    month: "long", // "March"
    day: "numeric", // "4"
  });

  function HandleInputChange(event) {
    setNewTask(event.target.value);
  }
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...tasks, newTask]);
      setNewTask("");
    }
  }
  function toggleEditMode() {
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
            <span className="text">{task}</span>
            {editMode && (
              <button className="removeBtn" onClick={() => removeTask(index)}>
                Remove
              </button>
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
            onChange={HandleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>
      )}
      <button className="edit-button" onClick={toggleEditMode}>
        {editMode ? "Finish Editing" : "Edit"}
      </button>
    </div>
  );
}
