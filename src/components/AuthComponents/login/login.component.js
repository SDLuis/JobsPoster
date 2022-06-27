import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import imgLogin from "../../../img/Login2.jpg";
import axios from "axios";
import Cookies from "js-cookie";

function LoginComponent() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [LoginStatus, setLoginStatus] = useState("");
  const [Logged, setLogged] = useState(false);

  const login = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email: userEmail,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLogged(true);
          setLoginStatus(response.data.loggedMessage);
          Cookies.set("jwt2",`${response.data.data}`, { expires: 7 })
        }
      });
  };
  useEffect(() => {
    if (Logged) {
      return navigate("/jobs/owner");
    }
  }, [Logged, navigate]);
  return (
    <div className="Body">
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
          <div className="card login-card ">
            <div className="row no-gutters">
              <Form.Group className="col-md-5">
                <img src={imgLogin} alt="login" className="login-card-img" />
              </Form.Group>
              <Form.Group className="col-md-7">
                <Form.Group className="card-body">
                  <Form.Group>
                      <h1>JOBS POSTER</h1>
                    <p className="login-card-description">Sign into your account</p>
                  </Form.Group>
                  <Form className="form">
                    <Form.Group controlId="formaBasicPassword">
                      <Form.Control
                        className="form-group input"
                        name="User_Email"
                        type="email"
                        placeholder="enter email"
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        className="form-group mb-4 input"
                        name="User_Password"
                        type="password"
                        placeholder="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        className="btn btn-block login-btn mb-4"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          login();
                        }}
                      >
                        Login
                      </Button>
                    </Form.Group>
                    <h2>{LoginStatus}</h2>
                    <p className="login-card-footer-text">
                      Don't have an account?{" "}
                      <a href="/register" className="text-reset">
                        Register here
                      </a>
                    </p>
                  </Form>
                </Form.Group>
              </Form.Group>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginComponent;
