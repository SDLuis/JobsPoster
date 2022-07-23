import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  faPaperPlane,
  faEnvelope,
  faMobileAlt,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./postulate.css";

export default function PostulateComponent() {
  const [form, setForm] = useState({
    email: "",
    numberPhone: "",
    message: "",
    file: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();
    const file = new FormData();
    file.append("file", form.file);
    file.append("email", form.email);
    file.append("numberPhone", form.numberPhone);
    file.append("message", form.message);
    console.log(Object.fromEntries(file));
  };
  return (
    <div>
      <Form className="FormPostulate" onSubmit={sendEmail}>
        <Form.Group>
          <Form.Label>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </Form.Label>
          <Form.Control
            type="text"
            name="email"
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <FontAwesomeIcon icon={faMobileAlt} /> Phone Number
          </Form.Label>
          <Form.Control
            type="text"
            name="numberPhone"
            onChange={(e) => {
              setForm({ ...form, numberPhone: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            {" "}
            <FontAwesomeIcon icon={faFileAlt} /> why do you deserve the job?
          </Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={3}
            onChange={(e) => {
              setForm({ ...form, message: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Add you CV</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={(e) => {
              setForm({ ...form, file: e.target.files[0] });
            }}
            multiple
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            <Button
              className="btn btn-block mt-2"
              variant="outline-light"
              type="submit"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Enviar Correo
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
