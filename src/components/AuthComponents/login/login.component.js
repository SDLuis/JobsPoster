import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import useUser from "../../../hooks/useUser";

function LoginComponent() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [useremail, setUseremail] = useState("");
  const { login, isLogged, failLogin } = useUser();

  useEffect(() => {
    if (isLogged) {
      return navigate("/jobs/owner");
    }
  }, [isLogged, navigate]);

  function Login() {
    return login({ useremail, password });
  }
  function checkFilledFields() {
    if (useremail === "" || password === "") {
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="Login">
      <main>
        <Form className="formulario">
          <Form.Group>
            <center>
              <h2>Welcome to Jobs Poster</h2>
            </center>
          </Form.Group>
          <Form.Group controlId="formaBasicPassword">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="User_Email"
              type="email"
              onChange={(e) => {
                setUseremail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="User_Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Button
              className="Button btn-block mt-3 mb-1"
              variant="success"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (checkFilledFields() === true) {
                  Login();
                } else {
                  failLogin();
                }
              }}
            >
              Log In
            </Button>
          </Form.Group>
          <Form.Group>
            <p className="login-card-footer-text">
              Don't have an account?{" "}
              <a href="/register" className="text-reset">
                Register here
              </a>
            </p>
          </Form.Group>
        </Form>
      </main>
    </div>
  );
}

export default LoginComponent;
