import React, { useState, useEffect } from "react";
import "../jobList/jobList.css";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getWorksCategory } from "../../../services/job.services";
import LoadingSpinner from "../../loading/loading.component";

export default function JobsList() {
  const params = useParams();
  const Category = params.category;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getWorksCategory(Category).then((response) => {
      setJobs(response);
      setLoading(false);
    });
  }, [Category]);

  function JobsCategory(job) {
    return (
        <Card className="Job position-relative shadow p-3 mb-5 bg-body rounded">
          <Card.Header className="titulo">{job.row.work_Title}</Card.Header>
          <Card.Body>
          <Card.Text>{job.row.workType}</Card.Text>
          <Card.Text>{job.row.Position}</Card.Text>
          <Card.Text>{job.row.apply_Method}</Card.Text>
        </Card.Body>
          <Card.Footer>
            <div>{job.row.description} <a className="abstract-link-more" href={`/Jobs/${job.row.Job_ID}/Details`}> Más detalles </a></div>
          </Card.Footer>
        </Card>
    );
  }

  if (loading) return <LoadingSpinner />;

  return jobs.map((row) => {
    return <JobsCategory key={row.Job_ID} row={row} />;
  });
}
