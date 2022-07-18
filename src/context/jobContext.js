import { useState, createContext, useContext } from "react";

const jobContext = createContext();

export const JobProvider = ({ children }) => {
    
  const [deleted, setDeleted] = useState(false)
  const [jobs, changeJobs] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <jobContext.Provider value={{deleted, setDeleted, jobs, changeJobs, currentPage, setCurrentPage}}>
      {children}
    </jobContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(jobContext);
};

export default jobContext
