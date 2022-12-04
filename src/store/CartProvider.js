import React, {useReducer}  from "react"
import CartContext from "./CartContext";

const defaultCartState = {

    items: [],
    totalAmount: 0
}

//action is dispatched and state is the last snapshot of the component
const cartReducer = (state, action) => {

   if(action.type==='ADD')
   {
    const updatedItems = state.items.concat(action.item);
    const updateTotalAmount = state.totalAmount + action.item.amount*action.item.price;
    return {
        items: updatedItems,
        totalAmount: updateTotalAmount
    }
   }

     return defaultCartState;
}

const CartProvider = props => {

//it returns an array having two elements
//first is always a state snapshot and other is a function which allows you to dispatch an action

   const [cartState, dispatchCartAction] =   useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
          
        // first is the name of the action and other to pass the items
        dispatchCartAction({type: 'ADD', item: item})

    }
    
    const removeItemToCartHandler = (id) => {
        
        dispatchCartAction({type: 'REMOVE', id: id})
    }
    
    const cartContext = {
        item: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;