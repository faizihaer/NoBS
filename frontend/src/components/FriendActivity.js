import React, { useState, useEffect } from "react";
import nudgeEmail from "./nudgeEmail";
import { useTasks } from "../TasksContext";
import axios from "axios";

export default function FriendActivity({
  user,
  ShowPopUpSecond,
  setShowPopUpSecond,
  ShowPopUpHourly,
  setShowPopUpHourly,
}) {
  const [lastClickTime, setLastClickTime] = useState(null);
  const [nudgesSent, setNudgesSent] = useState(0);
  // Placeholder state for friends' activities - you'll replace this with actual data fetching later
  const [friendsActivities, setFriendsActivities] = useState([]);
  const { tasks, setTasks } = useTasks();
  const [groupId, setUserGroupId] = useState(null);
  const [users, setUsers] = useState([]);

  // Handle nudge button click
  const handleNudgeClick = async (targetUser) => {
    const newLastClickTime = await nudgeEmail(
      user,
      targetUser,
      lastClickTime,
      nudgesSent,
      setNudgesSent,
      setShowPopUpSecond,
      setShowPopUpHourly
    );
    if (newLastClickTime) {
      setLastClickTime(newLastClickTime);
    }
  };

  useEffect(() => {
    const fetchFriendsActivities = async () => {
      try {
        // Fetch the user's group ID by email
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.post("http://localhost:4000/api/byemail", {
          userEmail: user.email,
        });

        const groupId = response.data.groupId;
        setUserGroupId(groupId); // Set the groupId in the state

        if (groupId) {
          const friendsActivitiesResponse = await axios.get(
            `http://localhost:4000/api/group/groupInfo`,
            { params: { groupId: groupId } }
          );
          setFriendsActivities(
            friendsActivitiesResponse.data.friendsActivities
          );
          //console.log(friendsActivitiesResponse.data.friendsActivities);
        }
      } catch (error) {
        console.error("Error fetching users details:", error);
      }
    };

    fetchFriendsActivities();

    const interval = setInterval(fetchFriendsActivities, 500);
    return () => clearInterval(interval); // Clean up on unmount
  }, [users]);

  return (
    <div>
      <h2 style={{ color: "white"}} className="section-title">Friend Activity</h2>
      {friendsActivities.length ? (
        friendsActivities.map((friend, index) => (
          <div className="friend" key={index}>
            <div className="activity-info">
              <span style={{ color: "white"}} className="friend-name">{friend.name}</span>
              {/* Placeholder for friend's activity details */}
            </div>
            <div className="activity-actions">
              <span style={{ color: "white"}} className="activity-progress">
                {friend.checkedTasksCount}/{tasks.length}
              </span>
              <button
              style={{ color: "white"}}
                className="nudge-button"
                onClick={() => handleNudgeClick(friend)}
              >
                Nudge Me
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "white"}}> No friends activites available </p>
      )}
      {ShowPopUpSecond && (
        <div style={{ color: "white"}} className="popup">
          <p>Wait 4 seconds before nudging again</p>
        </div>
      )}
      {ShowPopUpHourly && (
        <div style={{ color: "white"}} className="popup">
          <p>You can only nudge three times per hour</p>
        </div>
      )}
    </div>
  );
}
