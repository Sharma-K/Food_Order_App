import React, {useContext, useEffect, useState} from "react";
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";
const HeaderCartButton = (props) =>{


    

    const [btnIsHighlighted, setBtnHighlighted] = useState(false);

    // it will rerender whenever the cartContext changes in the cartProvider
  const cartCtx =  useContext(CartContext);


  
  // it is used to output number of cart items

  //reduce method which allows to transform the array of data into a single value
  //it will take two values one is a functiona and other a deault value
//   if(cartCtx.items!=null)
//   {
    // const numberOfCartItems = 0;
    const numberOfCartItems = cartCtx.item.reduce((current, item)=> current + item.amount,0);
//   }

const btnClasses = `${classes.button} ${btnIsHighlighted?classes.bump: ''}`;

useEffect(()=> {

    if(cartCtx.item.length===0)
    {
        return;
    }
    setBtnHighlighted(true);

   const timer = setTimeout(() => {
        setBtnHighlighted(false);
    }, 300);

    return () => {


        clearTimeout(timer);
    };

}, [cartCtx.item])

    return <button className={btnClasses}  onClick={props.onClick}>
        <span className={classes.icon}>
        <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge} >
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;