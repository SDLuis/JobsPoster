import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import iconBack from "../../../img/icons8-back-48.png";
import './singleJobs.css'

export default function FindJobs(job) {
  return (
    <div className="FindJobs">
      <Card className="Card-FindJobs">
        <Card.Header className="Header">
          <a className="iconBack" href={"/"} rel="noreferrer">
            <img src={iconBack} alt="example" />
          </a>
          {job.row.work_Title}
        </Card.Header>
        <Card.Body>
          <Card.Text>{job.row.workType}</Card.Text>
          <Card.Text>{job.row.Position}</Card.Text>
          <Card.Text>{job.row.apply_Method}</Card.Text>
          <Card.Text>{job.row.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link
            to={`/jobs/${job.row.Job_ID}/postulate`}
            className="btn btn-block"
            variant="outline-dark"
          >
            Postularse
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}
