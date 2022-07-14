import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import "../jobList/jobList.css";
import { Card, Button } from "react-bootstrap";

import Pagination from "../../paginateComponent/paginate.component";
import LoadingSpinner from "../../loading/loading.component";

import { getWorksCategory } from "../../../services/job.service";

export default function JobsList() {
  const params = useParams();
  const Category = params.category;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 10;
  console.log(PageSize)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, currentPage, jobs]);

  useEffect(() => {
    setLoading(true);
    getWorksCategory(Category).then((response) => {
      setJobs(response);
      setLoading(false);
    });
  }, [Category]);

  function JobsCategory(job) {
    return (
      <Card className="Job position-relative mb-3 bg-body rounded">
        <Card.Header className="titulo">{job.row.work_Title}</Card.Header>
        <Card.Body>
          <Card.Text>{job.row.workType}</Card.Text>
          <Card.Text>{job.row.Position}</Card.Text>
          <Card.Text>{job.row.apply_Method}</Card.Text>
          <Button
            className="VerMas"
            variant="outline-secondary"
            size="sm"
            href={`/Jobs/${job.row.Job_ID}/Details`}
          >
            Ver mas
          </Button>
        </Card.Body>
      </Card>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mt-auto">
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={jobs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <div className="Col">
      {currentTableData.map((row) => {
        return <JobsCategory key={row.Job_ID} row={row} />;
      })}
      </div>
    </div>
  );
}
