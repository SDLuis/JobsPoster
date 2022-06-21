import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ownJobs.css";
import { Card, Button } from "react-bootstrap";
import { ownJobs, deleteJobs } from "../../../services/job.services";
import LoadingSpinner from "../../Loading/loading.component";

export default function OwnJobs() {
  let navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setDeleted(false);
    setLoading(true);
    ownJobs().then((response) => {
      setJobs(response);
      setLoading(false);
    });
    if (deleted) {
      return navigate("/jobs/owner");
    }
  }, [deleted, navigate]);

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
            <div>
              {job.row.description}{" "}
              <a
                className="abstract-link-more"
                href={`/Jobs/${job.row.Job_ID}/Details`}
              >
                {" "}
                Más detalles{" "}
              </a>
            </div>
          </Card.Footer>
          <Card.Footer>
            <Button
              className="btn  bg-warning mr-5"
              type="button"
              onClick={(e) => {}}
            >
              Editar
            </Button>
            <Button
              className="btn bg-danger ml-5"
              type="button"
              onClick={() => {
                deleteJobs(job.row.Job_ID).then((res) => {
                  setDeleted(true);
                });
              }}
            >
              Eliminar
            </Button>
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
