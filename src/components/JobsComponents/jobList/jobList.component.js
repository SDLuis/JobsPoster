import React, { useState, useEffect, useMemo } from "react";

import { getWorks } from "../../../services/job.service";

import LoadingSpinner from "../../loading/loading.component";
import Pagination from "../../paginateComponent/paginate.component";
import Searchajobs from "../searchJobs/searchajobs.component";
import JobsListComponent  from "../listOfJobs/listOfJobs.component";

import "./jobList.css";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  let PageSize = 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, currentPage, jobs]);

  useEffect(() => {
    setLoading(true);
    getWorks().then((response) => {
      setJobs(response);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <div>
        <Searchajobs />
      </div>
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
