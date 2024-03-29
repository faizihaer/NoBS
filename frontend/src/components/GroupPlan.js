import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "../AuthService"; // Import the useAuth hook
import axios from "axios";
import { useTasks } from "../TasksContext";

export default function GroupPlan() {
  const [newTask, setNewTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [groupId, setUserGroupId] = useState(null);
  const [groupName, setGroupName] = useState("");
  const { tasks, setTasks } = useTasks();
  const { user } = useAuth();

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long", // "Monday"
    year: "numeric", // "2024"
    month: "long", // "March"
    day: "numeric", // "4"
  });

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        // Fetch the user's group ID by email
        await new Promise((resolve) => setTimeout(resolve, 500));
        const groupResponse = await axios.post(
          "http://localhost:4000/api/byemail",
          {
            userEmail: user.email,
          }
        );

        const groupId = groupResponse.data.groupId;
        setUserGroupId(groupId); // Set the groupId in the state

        if (groupId) {
          // Fetching group name using groupId
          const groupNameResponse = await axios.get(
            `http://localhost:4000/api/group/groupInfo`,
            {
              params: { groupId: groupId },
            }
          );
          setGroupName(groupNameResponse.data.groupName);

          // Fetching tasks for the group using the groupRoute '/tasks' endpoint
          const tasksResponse = await axios.get(
            `http://localhost:4000/api/task/tasks`,
            {
              params: { groupId: groupId },
            }
          );
          setTasks(tasksResponse.data.tasks); // Update the tasks state with the fetched tasks
        }
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails(); // Initial fetch

    const intervalId = setInterval(fetchGroupDetails, 500); // Fetch every 500ms

    return () => clearInterval(intervalId); // Cleanup on unmount
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

  useEffect(() => {
    sendPlanToDB(); // Send data to backend whenever tasks change
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
      <h2 style={{ color: "white"}} className="section-title">
        <span>Group Plan for: {groupName}</span>
        <span className="date-span">{dateString}</span>
      </h2>
      <ol>
        {tasks.map((task, index) => (
          <li style={{ color: "white"}} className="taskList" key={index}>
            <span className="text">{task.name}</span>
            {editMode && (
              <button style={{ color: "white"}} className="removeBtn" onClick={() => removeTask(index)}>
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
          <button style={{ color: "white"}} className="add-button" onClick={addTask}>
            Add
          </button>
        </div>
      )}
      <button style={{ color: "white"}} className="edit-button" onClick={toggleEditMode}>
        {editMode ? "Save" : "Edit"}
      </button>
    </div>
  );
}
