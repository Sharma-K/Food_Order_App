import classes from './Input.module.css'
import React from 'react';

// as it was a custom component in mealitemform so in order to use ref we have to use React.forward

const Input = React.forwardRef((props, ref) => {

    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} id={props.input.id} {...props.input} />
        </div>

    )

});
export default Input;