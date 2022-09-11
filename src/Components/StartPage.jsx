import React from "react"

function StartPage (props) {
    return (
        <div className="start-page">
          <h2>Quizzical</h2>
          <p>Take a quiz of five General knowledge questions</p>
          <button onClick={props.setStartQuizButtonTrue}>Start Quiz</button>
        </div> 
    )
}

export default StartPage