import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Table, Button } from "react-bootstrap";
import "./ownJobs.css";

import { ownJobs, deleteJobs } from "../../../services/job.services";
import LoadingSpinner from "../../loading/loading.component";

import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

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
        <tr key={job.Job_ID}>
          <td>{job.Job_ID}</td>
          <td>{job.work_Title}</td>
          <td>{job.workType}</td>
          <td>{job.apply_Method}</td>
          <td>{job.description}</td>
          <td>
            <Button
              variant="outline-danger"
              className="Modificadores"
              onClick={() => {
                deleteJobs(job.Job_ID)
                  .then((res) => {
                    MySwal.fire({
                      title: "Trabajo eliminado con exito",
                      icon: "success",
                      confirmButtonText: "Ok",
                      allowEnterKey: true,
                      allowEscapeKey: true,
                      allowOutsideClick: true,
                      timer: 3000,
                      timerProgressBar: true,
                    });
                    setDeleted(true);
                  })
                  .catch((err) => {
                    MySwal.fire({
                      title: "Trabajo no eliminado",
                      text: `Hubo un error al tratar de eliminar este trabajo, reintente mas tarde. Error: \n ${err.message}`,
                      icon: "error",
                      confirmButtonText: "Ok",
                      allowEnterKey: true,
                      allowEscapeKey: true,
                      allowOutsideClick: true,
                      timer: 3000,
                      timerProgressBar: true,
                    });
                  });
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Button
              variant="outline-warning"
              className="Modificadores"
              href={`/jobs/${job.Job_ID}/edit`}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </td>
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
