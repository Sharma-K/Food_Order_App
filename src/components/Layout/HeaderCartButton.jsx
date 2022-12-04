import React, {useContext} from "react";
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";
const HeaderCartButton = (props) =>{

    // it will rerender whenever the cartContext changes in the cartProvider
  const cartCtx =  useContext(CartContext);

  console.log('***********',cartCtx);
  // it is used to output number of cart items

  //reduce method which allows to transform the array of data into a single value
  //it will take two values one is a functiona and other a deault value
//   if(cartCtx.items!=null)
//   {
    // const numberOfCartItems = 0;
    const numberOfCartItems = cartCtx.item.reduce((current, item)=> current + item.amount,0)
//   }
    return <button className={classes.button}  onClick={props.onClick}>
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