import React, { useState, useCallback } from "react"
import { Router } from "@reach/router"
import { login, isAuthenticated, getProfile,
  firebaseDatabase,
  isBrowser } from "../utils/auth"
import Quiz from "./quiz"
import Create from "./create"
import Public from "./publicQuiz"
import "bootstrap/dist/css/bootstrap.min.css"
import Menu from "./menu"
import Edit from "./edit"
import Home from "./home"
import Permissions from "./permissions"
import NavbarComponent from "./navbar"


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
    if(isBrowser){
    await firebaseDatabase.doc(`${user.sub}`).get().then(data => {
      if(data.data()){
      setUserPower(data.data().permissions)}
    })}
  }
  getUserPowers()

  



  return (
    <>
      <NavbarComponent userPower={userPower}/>
      <main style={{minHeight: "85vh"}}>
      <Router>
        <Home path="/account/" user={user} />
        {userPower !== "Quiz Player" &&
        <Create path="/account/create" />}
        <Quiz path="/account/quiz" userData={questions} />
        {userPower !== "Quiz Player" &&
        <Menu path="/account/menu" callBackProps={callBackProps} />}
        <Public path="/account/public" callBackProps={callBackProps} userPower={userPower} />
        {userPower !== "Quiz Player" &&
        <Edit path="/account/edit"/>}
        {userPower === "Quiz Master" &&
        <Permissions path="/account/permissions"/>}
      </Router>
      </main>
      <footer class="footer py-3">
        <div class="container">
          <span class="text-muted">&copy; Joel Richards 2020</span>
        </div>
      </footer>
    </>
  )
}

export default Account
