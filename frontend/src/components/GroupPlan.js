import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "../AuthService"; // Import the useAuth hook
import axios from "axios";
import { useTasks } from "../TasksContext";

export default function GroupPlan() {
  const [newTask, setNewTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [groupId, setUserGroupId] = useState(null);
  const { tasks, setTasks } = useTasks();
  const { user } = useAuth();

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long", // "Monday"
    year: "numeric", // "2024"
    month: "long", // "March"
    day: "numeric", // "4"
  });
/*
  useEffect(() => {
    const fetchUserGroupId = async () => {
      try {
        // Wait for 1 second so that api gets called before the frontend
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch("http://localhost:4000/api/byemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.email }),
        });
        const result = await response.json();
        console.log("groupId =", result.groupId);

        setUserGroupId(result.groupId);
      } catch (error) {
        console.error("Error fetching user group ID:", error.message);
        // Handle error as needed
      }
    };

    fetchUserGroupId();
  }, [user]);
*/
useEffect(() => {
  const fetchGroupDetails = async () => {
    try {
      // Fetch the user's group ID by email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const groupResponse = await axios.post("http://localhost:4000/api/byemail", {
        userEmail: user.email,
      });

      const groupId = groupResponse.data.groupId;
      setUserGroupId(groupId); // Set the groupId in the state

      if (groupId) {
        // Fetching tasks for the group using the groupRoute '/tasks' endpoint
        const tasksResponse = await axios.get(`http://localhost:4000/api/task/tasks`, {
          params: { groupId: groupId }
        });
        setTasks(tasksResponse.data.tasks); // Update the tasks state with the fetched tasks
      }
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  if (user?.email) {
    fetchGroupDetails();
  }
}, [user, setTasks]); 

  function sendPlanToDB() {
    fetch("http://localhost:4000/api/task/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: groupId,
        tasks: tasks,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Tasks updated successfully:", data))
      .catch((error) => {
        console.error("Error saving tasks:", error);
      });
  }

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
      setTasks([...tasks, { name: newTask, checked: false }]);
      setNewTask("");
    }
  }

  function toggleEditMode() {
    if (editMode) {
      // When exiting edit mode, save the tasks
      sendPlanToDB();
    }
    setEditMode(!editMode);
  }

  function removeTask(indexToRemove) {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  }

  return (
    <div className="plan">
      <h2 className="section-title">
        <span>Group Plan for {groupId}</span>
        <span className="date-span">{dateString}</span>
      </h2>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task.name}</span>
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
        {editMode ? "Save" : "Edit"}
      </button>
    </div>
  );
}
