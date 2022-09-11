import React from "react"
import "./App.css"
import Question from "./Components/Question"
import TestData from "./Components/TestData"
import StartPage from "./Components/StartPage"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import axios from "axios"

function App() {

  const [quizdata, setQuizdata] = React.useState([])
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [quizStarted, setIsQuizStarted] = React.useState(false);

  const url = "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple";

  function setStartQuizButtonTrue() {
    setIsQuizStarted(true);
  }

  function getAnswers(questionObj) {
    let answerArr=[]
    answerArr.push(questionObj.correct_answer)
    questionObj.incorrect_answers.forEach(answer => answerArr.push(answer))
    shuffleArray(answerArr);
    return answerArr;
  }

  function processString(label) {
    let result=""
    result = label.replaceAll('&quot;', "''")
    result = result.replaceAll('&#039', '')
    return result
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  function createNewQuiz () {
    axios.get(url)
    .then((res) => {
      setQuizdata(constructQuestionData(res.data.results));
    })
    .catch((err) => {
      console.log(err);
      setQuizdata(constructQuestionData(TestData.results));
    })
  }

  function constructQuestionData (questionData) {
    return questionData.map(item => (
      {
        id: nanoid(),
        question: processString(item.question),
        correctAnswer: item.correct_answer,
        answers: getAnswers(item),
        selectedAnswer: ""
      }
    ))
  }

  function setSelectedAnswer(id, answer) {
    setQuizdata(prevData => (
      prevData.map(item => (
        item.id === id ? {
          ...item,
          selectedAnswer: answer
        } : item
      ))
    ))
  }

  function handleQuizButton() {
    if (isSubmitted) {
      createNewQuiz()
    }
    else {
      let numCorrectAnswers = 0;
      quizdata.forEach(item => (
      item.correctAnswer === item.selectedAnswer ? ++numCorrectAnswers : numCorrectAnswers
    ))
    setCorrectAnswers(numCorrectAnswers);
    }
    setIsSubmitted(prevVal => !prevVal);
  }

  React.useEffect(() => {
    createNewQuiz();
  }, [])

  return (
    <div className="App">
      {!quizStarted ? <StartPage setStartQuizButtonTrue = {setStartQuizButtonTrue}/>
      :
      (
        <div>
          {isSubmitted && correctAnswers === quizdata.length && <Confetti />}
          {quizdata && quizdata.map(item=> (
            <Question
              key={item.id} 
              questionObj={item} 
              id={item.id} 
              setSelectedAnswer={setSelectedAnswer}
              isSubmitted={isSubmitted}
              />
            ))}
            <div className="quiz-submit-container">
              {isSubmitted && <p>You have scored {correctAnswers} correct answers</p>}
              <button className={"quiz-button"} onClick={handleQuizButton}>
                {isSubmitted ? "Play Again" : "Submit"}</button>
            </div>
        </div>
      )} 
    </div>
)}

export default App;