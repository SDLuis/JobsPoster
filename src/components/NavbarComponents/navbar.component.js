import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "./navbar.css";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "../../hooks/useUser";

export default function NavbarComponent() {
  const { logout, isLogged } = useUser()

  function userBarButton() {
    if (isLogged) {
      return (
        <Button variant="warning" onClick={() => logout()}>
          <FontAwesomeIcon icon={faSignInAlt} /> Logout
        </Button>
      );
    } else if (!isLogged) {
      return (
        <Button variant="success" href="/login">
          Login
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
              className="brand-name add-jobs"
              title="Jobs"
              id="basic-nav-dropdown"
              hidden={!isLogged}
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
