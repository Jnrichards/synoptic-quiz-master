import React from 'react'
import { firebaseDatabase, isBrowser } from "../utils/auth"


export default function Score(props) {
    const score = props.score/props.length * 100
    if(isBrowser){
    firebaseDatabase.doc(sessionStorage.getItem("userId"))
    .collection(`Scores`)
    .doc(props.title)
    .set({score: score.toFixed(2), title: props.title})}

    return (
        <div>
            YOU GOT { score.toFixed(2)} {props.title}%
        </div>
    )
}
