import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./navbar.css";
export default function NavbarComponent() {
  return (
    <div>
      <Navbar variant="dark" expand="lg" className="Navbar">
        <Navbar.Brand  className="brand-name" href="/">Jobs Poster</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown className="brand-name"
              title="Jobs"
              id="basic-nav-dropdown"
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
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
