import { Table, Button } from "react-bootstrap";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ownJobs.css";
import useOwnJobs from "../../../hooks/useOwnJobs";

export default function OwnJobs(jobs) {
  const { DeleteJob } = useOwnJobs();

  return (
    <div className="ownJobs">
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
          <tbody>
            {jobs.row.map((job) => {
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
                      onClick={() => DeleteJob(job.Job_ID)}
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
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
