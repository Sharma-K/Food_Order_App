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

    const existingCartItemIndex = state.items.findIndex(item => item.id===action.item.id);
    const updateTotalAmount = state.totalAmount + action.item.amount*action.item.price;
    const existingCartItem = state.items[existingCartItemIndex];
    
    let updatedItems;

    if(existingCartItem)
    {
     const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems =[...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else{
        updatedItems = state.items.concat(action.item);
    }


   


    return {
        items: updatedItems,
        totalAmount: updateTotalAmount
    }
   }
   if(action.type==='REMOVE')
   {
    console.log('action id', action.id)
    console.log('state items', state.items);
    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if(existingCartItem.amount ===1)
    {
        updatedItems = state.items.filter(item => item.id!==action.id )
    }
    else {
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount-1};
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
    }
    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
    }

   }
   if (action.type === 'CLEAR') {
    return defaultCartState;
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

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
      };
    
    
    const cartContext = {
        item: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCart: clearCartHandler
    
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;