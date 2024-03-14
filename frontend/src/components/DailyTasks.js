import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthService";
import { useTasks } from "../TasksContext";
import axios from "axios";

export default function DailyTasks() {
  const { user } = useAuth();
  const { tasks, setTasks } = useTasks();
  const [userId, setUserId] = useState(null);
  const [userGroupId, setUserGroupId] = useState(null);
  const [post, setPost] = useState(false);

  useEffect(() => {
    console.log(user);
    const fetchUserId = async () => {
      try {
        //const response = await axios.post("http://localhost:4000/api/byemail",

        // Wait for 1 second so that api gets called before the frontend
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await fetch("http://localhost:4000/api/byemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if needed
          },
          body: JSON.stringify({ userEmail: user.email }),
        });
        console.log(response);
        const result = await response.json();
        console.log("UserId =", result.userId);
        setUserId(result.userId);
        if (!result.userId) {
          throw new Error("No user data received");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error.message);
        // Handle error as needed
      }
    };

    fetchUserId();
  }, [user.email]);

  //await new Promise((resolve) => setTimeout(resolve, 500));

  const postTasks = async () => {
    if (userId) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/userTaskRoute",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              tasks: tasks,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Optional: Do something with the response here
      } catch (error) {
        console.error("Error updating tasks:", error.message);
      }
    }
  };

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        // Fetch the user's group ID by email
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.post("http://localhost:4000/api/byemail", {
          userEmail: user.email,
        });

        const groupId = response.data.groupId;
        setUserGroupId(groupId); // Set the groupId in the state

        console.log("GROUPID", groupId);
        console.log("USERID", userId);

        if (userId && groupId) {
          const response = await axios.get(
            "http://localhost:4000/api/checkBoxRoute",
            { params: { userId: userId } }
          );

          //console.log("USERTASKCHECKMARKS: " , response.data);
          setTasks(response.data);
          // Optional: Do something with the response here
        }
      } catch (error) {
        console.error("Error updating tasks:", error.message);
      }
    };
    fetchUserTasks();
  }, [userId]);

  const handleCheckboxChange = (taskName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.name === taskName) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handlePostButtonClick = () => {
    setPost(true);

    setTimeout(() => {
      setPost(false);
    }, 500);
  };

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
      <button
        className="post-button"
        style={{ backgroundColor: post ? "#097312" : "" }}
        onClick={() => {
          postTasks({ userId, tasks });
          handlePostButtonClick();
        }}
      >
        Post
      </button>
    </div>
  );
}
//
