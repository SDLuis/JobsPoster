import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./register.css";
import imgRegister from "../../img/register2.jpg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export default function RegistryComponent() {
  const navigate = useNavigate();
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [useremailReg, setUseremailReg] = useState("");
  const [registed, setRegisted] = useState(false);

  const register = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        First_Name: firstNameReg,
        Last_Name: lastNameReg,
        email: useremailReg,
        password: passwordReg,
      })
      .then((response) => {
        if (response.data.message) {
          MySwal.fire({
            title: "Este email no esta disponible. Por favor intente con otro",
            icon: "error",
            confirmButtonText: true,
            allowEnterKey: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            timer: 5000,
            timerProgressBar: true,
          });
        } else {
          MySwal.fire({
            title: "Registro exitoso, redirigiendo",
            icon: "success",
            confirmButtonText: true,
            allowEnterKey: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            timer: 1000,
            timerProgressBar: true,
          });
          setRegisted(true);
        }
      })
      .catch((err) => {
        MySwal.fire({
          title: "No se pudo registrar, intente mas tarde",
          icon: "error",
          confirmButtonText: true,
          allowEnterKey: true,
          allowEscapeKey: true,
          allowOutsideClick: true,
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  useEffect(() => {
    if (registed) {
      return navigate("/login");
    }
  }, [registed, navigate]);

  return (
    <body>
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
          <div className="card login-card ">
            <div className="row no-gutters">
              <Form.Group className="col-md-5">
                <img src={imgRegister} alt="login" className="login-card-img" />
              </Form.Group>
              <Form.Group className="col-md-7">
                <Form.Group className="card-body">
                <Form.Group>
                      <h1>JOBS POSTER</h1>
                    <p className="login-card-description">Create a account</p>
                  </Form.Group>
                  <Form className="form">
                  <Form.Control
                    className="form-group input"
                    name="User_Name"
                    type="text"
                    placeholder="First name"
                    onChange={(e) => {
                      setFirstNameReg(e.target.value);
                    }}
                  />
                <Form.Group>
                  <Form.Control
                    className="form-group mb-4 input"
                    name="Last_Name"
                    type="text"
                    placeholder="Last name"
                    onChange={(e) => {
                      setLastNameReg(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    className="form-group mb-4 input"
                    name="User_Email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setUseremailReg(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                  className="form-group mb-4 input"
                    name="User_Password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPasswordReg(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="text-center">
                  <Button
                     className="btn btn-block login-btn mb-4"
                    variant="success"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      register();
                    }}
                  >
                    Registrar
                  </Button>
                </Form.Group>
                <p className="login-card-footer-text">
                      Have an account?{" "}
                      <a href="/login" className="text-reset">
                        Login here
                      </a>
                    </p>
                </Form>
              </Form.Group>
              </Form.Group>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}
