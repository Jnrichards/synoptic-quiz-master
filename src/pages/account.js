import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"
import Quiz from "./quiz"
import Create from "./create"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Menu from "./menu"

const Home = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <>
      {/* <nav>
        <Link to="/account/">Home</Link>{" "}
        <Link to="/account/quiz/">Quiz</Link>{" "}
        <Link to="/account/create/">Create</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav> */}
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
            <Link className="nav-item nav-link" to="/account/menu/">
              Menu
            </Link>{" "}
            <Link className="nav-item nav-link" to="/account/create/">
              Create
            </Link>{" "}
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
      <Router>
        <Home path="/account/" user={user} />
        <Quiz path="/account/quiz" />
        <Create path="/account/create" />
        <Menu path="/account/menu"/>
      </Router>
    </>
  )
}

export default Account
