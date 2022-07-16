import { useState, createContext, useContext } from "react";

const jobContext = createContext();

export const JobProvider = ({ children }) => {
  const [deleted, setDeleted] = useState(false)
  const [searchParam, setsearchParam] = useState("")

  return (
    <jobContext.Provider value={{deleted, setDeleted, searchParam, setsearchParam}}>
      {children}
    </jobContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(jobContext);
};

export default jobContext
