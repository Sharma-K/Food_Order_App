import React,{useContext} from "react";
import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/CartContext";
const Cart = (props) => {

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.item.length>0;

    const cartItemRemoveHandler =id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount:1});
    };

   const cartItems = <ul className={classes['cart-items']} >
    {cartCtx.item.map((item)=> (
        <CartItem
        id= {item.id} 
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd ={cartItemAddHandler.bind(null, item)}
         />
    ))
//bind will help you to configure the arguments before it is executed
//ensures it is passed the specific arguments
    }

</ul>

    return <Modal onHideCart={props.onHideCart}>
      {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
               <button className={classes['button--alt']} onClick={props.onHideCart} >Close</button>
               { hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>

}
export default Cart;