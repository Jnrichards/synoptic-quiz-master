import React, { useState, useCallback } from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile,
  firebaseDatabase,
  isBrowser } from "../utils/auth"
import { Link } from "gatsby"
import Quiz from "./quiz"
import Create from "./create"
import PublicQuiz from "./PublicQuiz"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Menu from "./menu"
import Edit from "./edit"

const Home = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}

const Account = () => {
  const [questions, setQuestions] = useState()

  const callBackProps = useCallback(props => setQuestions(props))
  const [userData, setUserData] = useState()
  const [userPower, setUserPower] = useState()

  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()
  const getData = async () => {
    if(isBrowser){
    const doc = await firebaseDatabase.doc(`${user.sub}`).get()
    return doc.exists ? doc.data() : null
    } 
  }

  getData().then(value => {
    value = !userData ? setUserData(value) : null
  })

  const getUserPowers = async () => {
    await firebaseDatabase.doc(`${user.sub}`).get().then(data => {
      if(data.data()){
      setUserPower(data.data().permissions)}
    })
  }
  getUserPowers()
  



  return (
    <>
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
        {userPower === "Quiz Master" &&
        <Create path="/account/create" />}
        <Quiz path="/account/quiz" userData={questions} />
        <Menu path="/account/menu" callBackProps={callBackProps} />
        <PublicQuiz path="/account/public" callBackProps={callBackProps} />
        <Edit path="/account/edit"/>
      </Router>
    </>
  )
}

export default Account
