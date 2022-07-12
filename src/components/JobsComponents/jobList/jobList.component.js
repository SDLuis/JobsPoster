import React, { useState, useEffect, useMemo } from "react";

import { getWorks } from "../../../services/job.services";

import LoadingSpinner from "../../loading/loading.component";
import Pagination from "../../paginateComponent/paginate.component";

import "./jobList.css";
import { faBriefcase, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button } from "react-bootstrap";

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

  function JobsCategory(job) {
    return (
      <Card className="Job position-relative mb-3 bg-body rounded">
        <Card.Header className="titulo">
          <FontAwesomeIcon icon={faBriefcase} /> {job.row.work_Title}
        </Card.Header>
        <Card.Body>
          <Card.Title>{job.row.Position}</Card.Title>
          <Card.Text>
            <FontAwesomeIcon icon={faClock} /> {job.row.workType}
          </Card.Text>
          <Card.Text className="cortar">{job.row.description}</Card.Text>
          <Button
            className="VerMas"
            variant="outline-dark"
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
    <div>
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
