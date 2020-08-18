import React, { useState, useEffect } from "react"
import { isBrowser, firebaseDatabase } from "../utils/auth"

export default function Home() {
  const [scoreList, setScore] = useState([])
  const [test, setTest] = useState([])
  const getData = async () => {
    let arr = []
    if (isBrowser) {
      const snapshot = await firebaseDatabase
        .doc(sessionStorage.getItem("userId"))
        .collection(`Scores`)
      snapshot.get().then(querySnapshot => {
        querySnapshot.docs.map(doc => {
          if (scoreList.length === 0) {
            arr.push(doc.data())
            setScore(arr)
          }
        })
      })
    }
  }
  getData()
  
  useEffect(() => {setTest(scoreList)}, [scoreList])
  return (
    test.map(score => (
    <div class="card mb-3">
      <div class="card-header">{score.title}</div>
      <div class="card-body">
        <div>
        This is your latest score on the {score.title} quiz!

          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              style={{ width: `${score.score}%` }}
              aria-valuenow={`${score.score}`}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {score.score}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )))
}
