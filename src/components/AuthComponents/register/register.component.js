import React, { useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { UseRegister } from "../../../hooks/useRegister";

export default function RegistryComponent() {
  const { Register, isRegister, form, setForm } = UseRegister();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isRegister) {
      return navigate("/login");
    }
  }, [isRegister, navigate]);

  return (
    <div className="Register">
      <main>
        <Form className="formularioReg ml-4 mr-4">
          <Form.Group>
            <center>
              <h1 className="title">Register</h1>
            </center>
          </Form.Group>
          <Form.Group className="form-row">
            <Form.Group className="col-md-6">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="User_Fname"
                type="text"
                onChange={(e) => {
                  setForm({ ...form, firstNameReg: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="User_Lname"
                type="text"
                onChange={(e) => {
                  setForm({ ...form, lastNameReg: e.target.value });
                }}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="User_Email"
              type="email"
              onChange={(e) => {
                setForm({ ...form, useremailReg: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="User_Password"
              type="password"
              onChange={(e) => {
                setForm({ ...form, passwordReg: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group as={Row}>
            <Col>
              <Button
                className="Button btn-block mt-3 mb-1"
                variant="success"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  Register();
                }}
              >
                Register
              </Button>
            </Col>
          </Form.Group>
          <Form.Group>
            <p className="login-card-footer-text">
              Already have an account?{" "}
              <a href="/login" className="text-reset">
                Login here
              </a>
            </p>
          </Form.Group>
        </Form>
      </main>
    </div>
  );
}
