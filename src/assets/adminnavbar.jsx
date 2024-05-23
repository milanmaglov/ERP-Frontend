/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/navbar.css';

export class AdminNavBar extends Component {
  handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-sm">
        <Container>
          <Navbar.Brand as={Link} to="/admin">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin">Home</Nav.Link>
              <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
              <Nav.Link as={Link} to="/admin/reports">Reports</Nav.Link>
              <NavDropdown title="Settings" id="admin-nav-dropdown">
                <NavDropdown.Item as={Link} to="/admin/settings/profile">Profile Settings</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/settings/security">Security Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/admin/settings/other">Other Settings</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
