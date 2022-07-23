import { Form, Button } from "react-bootstrap";
import "./postJob.css";

import usePostJobs from "../../../hooks/usePostJobs";

export default function PostJobsComponent() {
  const { formData, setFormData, postJob } = usePostJobs();

  return (
    <div className="Post">
      <Form>
        <Form.Group>
          <Form.Label>Work Title</Form.Label>
          <Form.Control
            type="Text"
            name="workTitle"
            onChange={(e) => {
              setFormData({ ...formData, workTitle: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="Text"
            name="workPosition"
            onChange={(e) => {
              setFormData({ ...formData, Position: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Working Time</Form.Label>
          <Form.Control
            as="select"
            name="workType"
            onChange={(e) => {
              setFormData({ ...formData, workType: e.target.value });
            }}
          >
            <option>Select work type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Remote</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Apply Method</Form.Label>
          <Form.Control
            type="Text"
            name="workApplyMethod"
            onChange={(e) => {
              setFormData({ ...formData, applyMethod: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="workDescription"
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button
            onClick={(e) => {
              e.preventDefault();
              postJob();
            }}
            className="btn-block mt-3"
            variant="secondary"
            size="lg"
            type="submit"
          >
            Publicar
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
