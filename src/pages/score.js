import React from "react"
import { firebaseDatabase, isBrowser } from "../utils/auth"
import { Link } from "gatsby"

export default function Score(props) {
  const score = (props.score / props.length) * 100
  if (isBrowser) {
    firebaseDatabase
      .doc(sessionStorage.getItem("userId"))
      .collection(`Scores`)
      .doc(props.title)
      .set({ score: score.toFixed(2), title: props.title })
  }

  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "130px"}}>
      <div class={"col-md-12"} style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
        <b>
          YOU GOT {score.toFixed(2)}% on the {props.title} quiz!!!
        </b>
      </div>
      <div>
        {" "}
        <Link to="/account/">
          <button class="btn btn-primary mr-2">
            Home
          </button>
        </Link>
      </div>
    </div>
  )
}
