import React,{useState,useContext} from "react";
import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/CartContext";
import Checkout from './Checkout'
const Cart = (props) => {

    const cartCtx = useContext(CartContext);
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.item.length>0;

    const onOrderHandler = ()=>{
        setIsCheckOut(true);

    }

    const cartItemRemoveHandler =id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount:1});
        
    };

    const submitHandler = (userData) =>{
        setIsSubmitting(true);
        fetch('https://food-delivery-da137-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.item
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

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
const modalActions =  <div className={classes.actions}>
<button className={classes['button--alt']} onClick={props.onHideCart} >Close</button>
{ hasItems && <button className={classes.button} onClick={onOrderHandler}>Order</button>}
</div>

const cartModalContent = (
    <>
     {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckOut &&<Checkout onConfirm={submitHandler} onCancel={props.onHideCart} />}
       {!isCheckOut && modalActions}
    </>

)

const isSubmittingModalContent = <p>Sending order data...</p>;

const didSubmitModalContent = (
  <React.Fragment>
    <p>Successfully sent the order!</p>
    <div className={classes.actions}>
    <button className={classes.button} onClick={props.onHideCart}>
      Close
    </button>
  </div>
  </React.Fragment>
);

    return <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
       
    </Modal>

}
export default Cart;