import React, { useState, useEffect } from "react";
import "./jobList.css";
import { Card } from "react-bootstrap";
import { findJobs } from "../../../services/job.services";
import LoadingSpinner from "../../loading/loading.component";
import { useParams } from "react-router-dom";
import iconBack from '../../../img/icons8-back-48.png'

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const Job_ID = params.Job_ID;

  useEffect(() => {
    setLoading(true);
    findJobs(Job_ID).then((response) => {
      setJobs(response);
      setLoading(false);
    });
  }, [Job_ID]);

  function JobsById(job) {
    return (
      <Card className="Jobs">
        <Card.Header className="Header">
        <a className="iconBack" href={`/category/${job.row.workType}`} rel="noreferrer">
          <img
            src={iconBack}
            alt="example"
          />
        </a>
          {job.row.work_Title}
          </Card.Header>
        <Card.Body>
          <div>{job.row.workType}</div>
          <div>{job.row.Position}</div>
          <div>{job.row.apply_Method}</div>
        </Card.Body>
        <Card.Footer>
          <div>{job.row.description}</div>
        </Card.Footer>
      </Card>
    );
  }
  if (loading) return <LoadingSpinner />;
  return <JobsById key={jobs.Job_ID} row={jobs} />;
}
