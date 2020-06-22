import React from 'react'
import classes from './FinishQuiz.css'
import Button from "../UI/Button/Button";

const FinishQuiz = props  =>{
    const successCount = Object.keys(props.results).reduce((total, key)=> {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)
    return(
        <div className={classes.FinishQuiz}>
           <ul>
               {props.quiz.map((quizItem, index) => {

                   const cls =[
                       'fa',
                       props.results[quizItem.id] === 'error' ? 'fa-times' : "fa-check",
                       classes[props.results[quizItem.id]]
                   ]


                   return(
                       <li
                       key={index}>
                           <strong>{index+1}</strong>.&nbsp;
                           {quizItem.question}
                           <i className={cls.join(" ")} />
                       </li>
                   )
               }) }

           </ul>

            <p>Правильно {successCount}   из {props.quiz.length}</p>
            <Button onClick={props.onRetry} type="primary"> Повторить</Button>
            <Button  type="success"> Перейти в списоак тестов</Button>


        </div>
    )
}

export default FinishQuiz