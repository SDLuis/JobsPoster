import { Form, Button } from "react-bootstrap";
import editJob from "../../../hooks/useEditJobs";
import "./editJob.css";

export default function EditJobsComponent() {
  const { editJobsDone, editJobsFail, formData, setFormData, checkFilledFields } = editJob();
  
  return (
      <div className="Post">
      <Form>
        <Form.Group>
          <Form.Label>Work Title</Form.Label>
          <Form.Control
            type="Text"
            name="work_Title"
            value={formData.workTitle}
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
            value={formData.Position}
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
            value={formData.workType}
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
            value={formData.applyMethod}
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
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (checkFilledFields() === true) {
                editJobsDone(formData);
              } else {
                editJobsFail();
              }
            }}
            className="btn-block mt-3"
            variant="secondary"
            size="lg"
            type="submit"
          >
            Editar
          </Button>
        </Form.Group>
      </Form>
      </div>
  );
}
