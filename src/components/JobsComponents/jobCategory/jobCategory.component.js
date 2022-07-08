import React, { useState, useEffect } from "react";
import "../jobList/jobList.css";
import { Card, Button } from "react-bootstrap";
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
    <div className="Col">
      {jobs.map((row) => {
        return <JobsCategory key={row.Job_ID} row={row} />;
      })}{" "}
    </div>
  );
}
