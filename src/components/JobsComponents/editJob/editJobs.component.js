import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as jobService from "../../../services/job.service";
import editJob from "../../../hooks/useEditJobs";
import "./editJob.css";

export default function EditJobsComponent() {
  const { editJobsDone, editJobsFail } = editJob();
  const params = useParams();
  const Job_ID = params.Job_ID;
  const [formData, setFormData] = useState({
    workTitle: "",
    Position: "",
    workType: "",
    applyMethod: "",
    description: "",
  });

  useEffect(() => {
    jobService.findJobs(Job_ID).then((job) => {
      setFormData({
        ...formData,
        workTitle: job.work_Title,
        Position: job.Position,
        workType: job.workType,
        applyMethod: job.apply_Method,
        description: job.description,
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Job_ID]);

  function checkFilledFields() {
    if (
      formData.workTitle === "" ||
      formData.Position === "" ||
      formData.workType === "Select work type" ||
      formData.applyMethod === "" ||
      formData.description === ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div>
      <Form className="Post">
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
                editJobsDone(Job_ID, formData);
              } else {
                editJobsFail();
              }
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
