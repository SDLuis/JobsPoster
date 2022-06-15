import React, { useState, useEffect } from "react";
import "./jobList.css";
import { Card } from "react-bootstrap";
import { getWorks } from "../../../services/job.services";
import LoadingSpinner from "../../loading/loading.component";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getWorks().then((response) => {
      setJobs(response);
      setLoading(false);
    });
  }, []);

  function JobsCategory(job) {
    return (
      <section className="main-container">
        <Card>
          <Card.Header>{job.row.work_Title}</Card.Header>
          <Card.Body>
          <div>{job.row.workType}</div>
          <div>{job.row.Position}</div>
          <div>{job.row.apply_Method}</div>
        </Card.Body>
          <Card.Footer>
            <div>{job.row.description} <a className="abstract-link-more" href={`/Jobs/${job.row.Job_ID}/Details`}> Más detalles </a></div>
          </Card.Footer>
        </Card>
      </section>
    );
  }
  if (loading) return <LoadingSpinner />;
  return jobs.map((row) => {
    return <JobsCategory key={row.Job_ID} row={row} />;
  });
}
