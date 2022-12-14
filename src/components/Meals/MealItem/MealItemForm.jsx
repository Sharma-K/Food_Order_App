import React,{useRef, useState} from 'react';
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';

const MealItemForm = (props) =>{ 

    const [valid, isValid] = useState(true);

    const amountInputRef= useRef();

    const submitHandler =(event) =>{
        event.preventDefault();
    
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length===0||enteredAmountNumber<1|| enteredAmountNumber>5)
    {
        isValid(false);
        return;
    }

    props.onAddToCart(enteredAmountNumber);
}


//refs do not work on custom components

    return (
        <form action="" className={classes.form} onSubmit={submitHandler}>
            <Input
            ref={amountInputRef}
             label="Amount" 
            input={{
                id: 'amount_'+ props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
          {!valid && <p>Please enter a valid amount</p> }
        </form>
    )
}

export default MealItemForm;