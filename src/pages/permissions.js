import React, { useState } from "react"
import { firebaseDatabase, isBrowser } from "../utils/auth"

export default function Permissions({ user }) {
  const [usersList, setUserList] = useState([])
  const [permission, setPermission] = useState()
  async function getData() {
    if (isBrowser && usersList.length === 0) {
      const snapshot = await firebaseDatabase.get()
      setUserList(snapshot.docs.map(doc => doc.data()))
    }
  }
  getData()

  const saveChoice = event => {
    setPermission(event.target.value)
  }

  const stopChoice = event => {
    event.preventDefault()    
  }

  const chooseChoice = (choice) => {
    if(isBrowser){
    firebaseDatabase.doc(`${choice.userId}`).update({permissions: permission})}
  }

  if (usersList.length === 0) {
    return <div>Loading</div>
  } else {
    return (
      <div class="my-3 p-3 bg-white rounded shadow-sm">
        <h6 class="border-bottom border-gray pb-2 mb-0">Profiles</h6>
        {usersList
          .filter(user => user.email)
          .map(user => (
            <div class="media text-muted pt-3">
              <svg
                class="bd-placeholder-img mr-2 rounded"
                width="32"
                height="32"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
                aria-label="Placeholder: 32x32"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#007bff" />
                <text x="50%" y="50%" fill="#007bff" dy=".3em">
                  32x32
                </text>
              </svg>
              <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <strong class="text-gray-dark">{user.nickname}</strong>
                  <form onSubmit={stopChoice}>
                    <div class="form-row align-items-center">
                      <div class="col-auto my-1">
                        <label
                          class="mr-sm-2 sr-only"
                          for="inlineFormCustomSelect"
                        >
                          Preference
                        </label>
                        <select
                          class="custom-select mr-sm-2"
                          id="inlineFormCustomSelect"
                          onChange={saveChoice}
                        >
                          <option selected>Choose...</option>
                          <option value="Quiz Creator">Quiz Creator</option>
                          <option value="Quiz Player">Quiz Player</option>
                          <option value="Quiz Player">Quiz Master</option>
                        </select>
                      </div>
                      <div class="col-auto my-1">
                        <button type="submit" class="btn btn-primary" onClick={() => chooseChoice(user)}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <span class="d-block">{user.email}</span>
              </div>
            </div>
          ))}
      </div>
    )
  }
}
