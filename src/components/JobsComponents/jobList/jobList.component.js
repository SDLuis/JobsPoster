import React, { useState, useEffect, useMemo, useContext } from "react";

import { getWorks } from "../../../services/job.service";
import jobContext from "../../../context/jobContext";

import LoadingSpinner from "../../loading/loading.component";
import Pagination from "../../paginateComponent/paginate.component";
import Searchajobs from "../searchJobs/searchajobs.component";
import JobsListComponent  from "../listOfJobs/listOfJobs.component";
import NotJobsFoundComponent from "../../ErrorComponents/NotJobsFound/NotJobsFound.component";

import "./jobList.css";

export default function JobsList() {
  const { jobs, changeJobs } = useContext(jobContext)
  const [loading, setLoading] = useState(false);
  const { currentPage, setCurrentPage } = useContext(jobContext)
  
  let PageSize = 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, currentPage, jobs]);

  useEffect(() => {
    setLoading(true);
    getWorks().then((response) => {
      changeJobs(response);
      setLoading(false);
    });
  }, [changeJobs]);

  return (
    <div>
      <div>
        <Searchajobs />
      </div>
      { loading ? <LoadingSpinner /> : null}
      { jobs.length === 0 && !loading ? <NotJobsFoundComponent/> : null }
      <div className="Col">
      {currentTableData.map((row) => {
        return <JobsListComponent key={row.Job_ID} row={row} />;
      })}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={jobs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
