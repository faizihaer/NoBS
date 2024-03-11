import { createContext, useState, useContext } from 'react';

const GroupNameContext = createContext();

export const useGroupName = () => useContext(GroupNameContext);

export const GroupNameProvider = ({ children }) => {
  const [groupName, setGroupName] = useState("");

  return (
    <GroupNameContext.Provider value={[groupName, setGroupName]}>
      {children}
    </GroupNameContext.Provider>
  );
};