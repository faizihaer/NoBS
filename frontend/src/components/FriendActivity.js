import React, {useState, useEffect} from 'react';
import nudgeEmail from "./nudgeEmail";

export default function FriendActivity({user,showPopUp,setShowPopUp, tasks}){
  const [lastClickTime, setLastClickTime] = useState(null);
  // Placeholder state for friends' activities - you'll replace this with actual data fetching later
  const [friendsActivities, setFriendsActivities] = useState([]);

    // Handle nudge button click
  const handleNudgeClick = async (targetUser) => {
    const newLastClickTime = await nudgeEmail(
      user,
      targetUser,
      lastClickTime,
      setShowPopUp
    );
    if (newLastClickTime) {
      setLastClickTime(newLastClickTime);
    }
  };
  useEffect(() => {
    // Placeholder for fetching friends' activities
    // Simulate fetching data with a timeout or replace with an actual API call
    const fetchFriendsActivities = async () => {
      // call database to retrieve friend activity
      const simulatedData = [
        { name: 'Bob', email: 'bob@example.com', progress: 2 },
        { name: 'Rob', email: 'rob@example.com', progress: 2 },
        { name: 'Tom', email: 'tom@example.com', progress: 0 },
      ];
      setFriendsActivities(simulatedData);
    };

    fetchFriendsActivities();
  }, []); 
  
  return (
    <div>
      <h2 className="section-title">Friend Activity</h2>
      {friendsActivities.length ? (
        friendsActivities.map((friend, index) => (
          <div className="friend" key={index}>
            <div className="activity-info">
              <span className="friend-name">{friend.name}</span>
              {/* Placeholder for friend's activity details */}
            </div>
            <div className="activity-actions">
              <span className="activity-progress">{friend.progress}/{tasks.length}</span>
              <button className="nudge-button" onClick={() => handleNudgeClick(friend.email)}>
                Nudge Me
              </button>
            </div>
          </div>
        ))
      ) : (
        <p> friends' activities...</p>
      )}
    </div>
  );
}

