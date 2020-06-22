import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../components/FinishQuiz/FinishQuiz";
import React, {Component} from 'react'
import classes from './Quiz.css'

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: `Какой ты фрукт?`,
        rightAnswerId: 2,
        id: 1,
        answers:[
          {text: `Морковка`, id: 1},
          {text: `Огурчик`, id: 2},
          {text: `Шпинат`, id: 3},
          {text: `Редиска`, id: 4}
        ]
      },
      {
        question: `6/2(1+2)= ?`,
        rightAnswerId: 4,
        id: 2,
        answers:[
          {text: `0`, id: 1},
          {text: `9`, id: 2},
          {text: `4`, id: 3},
          {text: `1`, id: 4}
        ]
      }
    ]
  };

  onAnswerClickHandler = (answerId) => {
    const results = this.state.results
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success'){
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]


    if (question.rightAnswerId === answerId) {
        if(!results[question.id]) {
          results[question.id] = 'success'
        }
      this.setState({
        answerState: {[answerId]: 'success'},
       results
      })
      const timeout = window.setTimeout( () => {
        if (this.isQuizFinished()){
         this.setState({
           isFinished: true

         })
        }else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
    window.clearTimeout(timeout)
      }, 1000)

    }else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
            results
      })
    }
}
  isQuizFinished() {
      return this.state.activeQuestion +1 === this.state.quiz.length

  }

  retryHandler = () => {
      this.setState({
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        result: {}
      })
  }
  render() {
    return (
      <div className={classes.Quiz}>

        <div className={classes.QuizWrapper}>
          <h1>Ответьте на вопросы</h1>
          {
            this.state.isFinished ?
                <FinishQuiz
                    results={this.state.results}
                    quiz={this.state.quiz}
                    onRetry={this.retryHandler}
                /> :

          <ActiveQuiz
          answers={this.state.quiz[this.state.activeQuestion].answers}
          question={this.state.quiz[this.state.activeQuestion].question}
          onAnswerClick={this.onAnswerClickHandler}
          quizLength={this.state.quiz.length}
          answerNumber={this.state.activeQuestion + 1}
          state={this.state.answerState}
          />
          }
        </div>
      </div>
    )
  }
}


export default Quiz