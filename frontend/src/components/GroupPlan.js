import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "../AuthService"; // Import the useAuth hook

export default function GroupPlan({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const currentDate = new Date();
  const [userGroupId, setUserGroupId] = useState(null);
  const { user } = useAuth();

  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long", // "Monday"
    year: "numeric", // "2024"
    month: "long", // "March"
    day: "numeric", // "4"
  });

  useEffect(() => {
    const fetchUserGroupId = async () => {
      try {
        // Wait for 1 second so that api gets called before the frontend
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch("http://localhost:4000/api/byemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.email }),
        });
        const result = await response.json();
        console.log("userGroupId =", result.userGroupId);

        setUserGroupId(result.userGroupId);
      } catch (error) {
        console.error("Error fetching user group ID:", error.message);
        // Handle error as needed
      }
    };

    fetchUserGroupId();
  }, [user]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
        <span>Group Plan for {userGroupId}</span>
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
