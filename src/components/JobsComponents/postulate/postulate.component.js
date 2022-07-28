import { useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  faPaperPlane,
  faEnvelope,
  faMobileAlt,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./postulate.css";
import UsePostulate from "../../../hooks/usePostulate";
import { useNavigate } from "react-router-dom";


export default function PostulateComponent() {
  const { sendEmail, form, setForm, isLoading, emailSend } = UsePostulate();
  let navigate = useNavigate();

  useEffect(() => {
    if (emailSend) {
      return navigate("/");
    }
  }, [emailSend, navigate]);

  return (
    <div>
      <Form className="FormPostulate" onSubmit={sendEmail}>
        <Form.Group>
          <Form.Label hidden={!isLoading}>Validando Credenciales...</Form.Label>
          </Form.Group>
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
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            <Button
              className="btn btn-block mt-2"
              variant="outline-light"
              type="submit"
              disabled={isLoading}
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
