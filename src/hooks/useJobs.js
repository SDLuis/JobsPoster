import { useState, useEffect, useMemo, useContext } from "react";

import { getWorks } from "../services/job.service";
import jobContext from "../context/jobContext";

export default function UseJobs() {
    const { jobs, changeJobs, currentPage, setCurrentPage } = useContext(jobContext)
    const [loading, setLoading] = useState(true);
    
    let PageSize = 10;
  
    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return jobs.slice(firstPageIndex, lastPageIndex);
    }, [PageSize, currentPage, jobs]);
  
    useEffect(() => {
      setLoading(true)
      getWorks().then((response) => {
        changeJobs(response);
        setLoading(false);
      });
    }, [changeJobs]);
  
  return { jobs, currentTableData, loading, currentPage, setCurrentPage, PageSize }
}