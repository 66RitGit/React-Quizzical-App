import React from "react"

function Question(props) {
    return (
        <div className="question-container">
            <h2>{props.questionObj.question}</h2>
            <div className="question-button-container">
                {
                    props.questionObj.answers.map(answer => (
                        <button className = 
                            {"question-button " + 
                            (!props.isSubmitted && props.questionObj.selectedAnswer === answer ? "selected" : "") }
                            key={answer}
                            style={props.isSubmitted ? 
                                    props.questionObj.correctAnswer === answer ? 
                                    {backgroundColor: '#bfff00'} : props.questionObj.selectedAnswer === answer ?
                                    {backgroundColor: '#ff4000'} : {} : {}}
                            onClick={() => (props.setSelectedAnswer(props.questionObj.id, answer))}>{answer}
                        </button>
                    ))
                }
            </div>
            <div className="line"></div>
        </div>
    )
}

export default Question