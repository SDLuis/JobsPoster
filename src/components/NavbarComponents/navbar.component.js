import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "./navbar.css";
import Cookies from "js-cookie";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function NavbarComponent() {
  const [logged, setLogged] = useState();
  useEffect(() => {
    if (Cookies.get("jwt2")) {
      setLogged(true);
    }
    else{
      setLogged(false)
    }
  }, [logged]);

  function userBarButton() {
    const logout = () => {
      Cookies.remove("jwt2");
      setLogged(false)
    };

    if (logged === false) {
      return (
        <Button variant="success" href="/login">
        Login
      </Button>
      );
    } else {
      return (
        <Button variant="warning" onClick={() => logout()}>
          <FontAwesomeIcon icon={faSignInAlt} /> Logout
        </Button>
      );
    }
  }

  return (
    <div>
      <Navbar variant="dark" expand="lg" className="Navbar">
        <Navbar.Brand className="brand-name" href="/">
          Jobs Poster
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              className="brand-name"
              title="Jobs"
              id="basic-nav-dropdown"
              hidden={!logged}
            >
              <NavDropdown.Item href="/jobs/add">
                Agregar trabajo
              </NavDropdown.Item>
              <NavDropdown.Item href="/jobs/owner">
                Mis trabajos
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="mr-auto"></Nav>
          <>{userBarButton()}</>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
