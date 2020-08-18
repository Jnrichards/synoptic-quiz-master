import React from 'react'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { Link } from "gatsby"
import {logout} from "../utils/auth"

export default function NavbarComponent(props) {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-item nav-link" to="/account/">
              Home
            </Link>{" "}
            <Link className="nav-item nav-link" to="/account/public/">
              Public
            </Link>{" "}
            {props.userPower !== "Quiz Player" &&
            <Link className="nav-item nav-link" to="/account/menu/">
              Menu
            </Link>}
            {props.userPower !== "Quiz Player" &&
            <Link className="nav-item nav-link" to="/account/create/">
              Create
            </Link>}
            {props.userPower === "Quiz Master" &&
            <Link className="nav-item nav-link" to="/account/permissions/">
              Permissions
            </Link>}
            <a
              className="nav-item nav-link"
              href="#logout"
              onClick={e => {
                logout()
                e.preventDefault()
              }}
            >
              Log Out
            </a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
