import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as jobService from "../../../services/job.services";
import "./postJob.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PostJobsComponent() {
  const [formData, setFormData] = useState({
    workTitle: "",
    Position: "",
    workType: "",
    applyMethod: "",
    description: "",
  });

  function checkFilledFields() {
    if (
      formData.workTitle === "" ||
      formData.Position === "" ||
      formData.workType === "" ||
      formData.applyMethod === "" ||
      formData.description === ""
      //test include
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
              if (checkFilledFields() === true) {
                jobService
                  .postJob(formData)
                  .then((res) => {
                    let serverResponse = res.status;
                    if (serverResponse === 200) {
                      MySwal.fire({
                        title: "Se anadio el trabajo correctamente",
                        icon: res.data.icon,
                        confirmButtonText: "OKE",
                        allowEnterKey: true,
                        allowEscapeKey: true,
                        allowOutsideClick: true,
                        timer: 1500,
                        imerProgressBar: true,
                      });
                    } else {
                      MySwal.fire({
                        title: "Trabajo no publicado",
                        text: res.data,
                        icon: "error",
                        confirmButtonText: "OKE",
                        allowEnterKey: true,
                        allowEscapeKey: true,
                        allowOutsideClick: true,
                        timer: 3000,
                        timerProgressBar: true,
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                MySwal.fire({
                  title: "Trabajo no publicado",
                  text: "Rellene todos los campos y asegurese de haber cliqueado bien la categoria y el tipo de trabajo que tiene",
                  icon: "error",
                  confirmButtonText: "Ok",
                  allowEnterKey: true,
                  allowEscapeKey: true,
                  allowOutsideClick: true,
                  timer: 3000,
                  timerProgressBar: true,
                });
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
