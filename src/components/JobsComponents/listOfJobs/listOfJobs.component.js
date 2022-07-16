import { faBriefcase, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button } from "react-bootstrap";

export default function JobsList(job) {
    return (
      <Card className="Job position-relative mb-3 bg-body rounded">
        <Card.Header className="titulo">
          <FontAwesomeIcon icon={faBriefcase} /> {job.row.work_Title}
        </Card.Header>
        <Card.Body>
          <Card.Title>{job.row.Position}</Card.Title>
          <Card.Text>
            <FontAwesomeIcon icon={faClock} /> {job.row.workType}
          </Card.Text>
          <Card.Text className="cortar">{job.row.description}</Card.Text>
          <Button
            className="VerMas"
            variant="outline-dark"
            size="sm"
            href={`/Jobs/${job.row.Job_ID}/Details`}
          >
            Ver mas
          </Button>
        </Card.Body>
      </Card>
    );
  }