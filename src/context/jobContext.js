import React, { useState, useContext } from "react";

const jobContext = React.createContext();

export const JobProvider = ({ children }) => {
  const [deleted, setDeleted] = useState(false)

  return (
    <jobContext.Provider value={{deleted, setDeleted}}>
      {children}
    </jobContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(jobContext);
};

export default jobContext
