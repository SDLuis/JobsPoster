import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import "./ownJobs.css";
import { ownJobs } from "../../../services/job.services";
import LoadingSpinner from "../../loading/loading.component";

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

  function JobsCategory() {
    return jobs.map((job) => {
      return (
        <tr>
          <td>{job.Job_ID}</td>
          <td>{job.work_Title}</td>
          <td>{job.workType}</td>
          <td>{job.apply_Method}</td>
          <td>{job.description}</td>
        </tr>
      );
    });
  }
  if (loading) return <LoadingSpinner />;
  return (
    <div className="List">
      <Table size="sm" variant="dark" striped hover>
        <thead>
          <tr>
            <td>ID</td>
            <td>Titulo</td>
            <td>Tipo</td>
            <td>Ubicacion</td>
            <td>Posicion</td>
            <td>Opciones</td>
          </tr>
        </thead>
        <tbody>{JobsCategory()}</tbody>
      </Table>
    </div>
  );
}
