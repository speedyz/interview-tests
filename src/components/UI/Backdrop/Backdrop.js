import classes from './Backdrop.css'
import React from 'react'

const Backdrop = props =>
    <div className={classes.Backdrop} onClick={props.onClick}></div>

export default Backdrop