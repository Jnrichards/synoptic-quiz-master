import React, { useState } from "react"
import { firebaseDatabase, isBrowser } from "../utils/auth"
import "bootstrap/dist/css/bootstrap.css"
import { Link } from "gatsby"

export default function PublicQuiz(props) {
  const [menuItems, setMenuItems] = useState([])

  const getMarker = async props => {
    if(isBrowser){
    const snapshot = await firebaseDatabase
      .doc("public")
      .collection(`Questions`)
    snapshot.get().then(querySnapshot => {
      const tempDoc = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      if (menuItems.length === 0) {
        setMenuItems(tempDoc)
      }
    })
  }}
  getMarker()

  const deleteEntry = item => {
    if(isBrowser){
    firebaseDatabase
      .doc(sessionStorage.getItem("userId"))
      .collection(`Questions`)
      .doc(`${item}`)
      .delete()}
  }

  return (
    <div className="row">
      {menuItems.map(item => (
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.id}</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              {item.publisedDetails ? (
                <Link to="/account/quiz/">
                <button
                  onClick={() => props.callBackProps(item.publisedDetails)}
                  className="btn btn-primary mr-2"
                >
                  Play
                </button>
                </Link>
              ) : (
                <Link to="/account/quiz/">

                <button
                  onClick={() => props.callBackProps(item.details)}
                  className="btn btn-primary mr-2"
                >
                    Play
                </button>
                </Link>

              )}
              {item.userId === sessionStorage.getItem("userId") || props.userPower === "Quiz Master" ? (
                <button
                  onClick={() => deleteEntry(item.id)}
                  className="btn btn-primary mr-2"
                >
                  Unpublish
                </button>
              ) : null}
              {/* <button
                //   onClick={() => publishEntry(item)}
                  className="btn btn-primary"
                >
                  Publish
                </button> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}