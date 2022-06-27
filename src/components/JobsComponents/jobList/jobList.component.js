import React, { useState, useEffect } from "react";
import "./jobList.css";
import {
  faBriefcase,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button } from "react-bootstrap";
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
      <Card className="Job position-relative shadow p-3 mb-5 bg-body rounded">
        <Card.Header className="titulo">
          <FontAwesomeIcon icon={faBriefcase} /> {job.row.work_Title}
        </Card.Header>
        <Card.Body>
          <Card.Title>{job.row.Position}</Card.Title>
          <Card.Text>
            <FontAwesomeIcon icon={faMapMarkedAlt} /> {job.row.workType}
          </Card.Text>
          <Card.Text className="cortar">{job.row.description}</Card.Text>
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
  return jobs.map((row) => {
    return <JobsCategory key={row.Job_ID} row={row} />;
  });
}
