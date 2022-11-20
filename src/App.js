import React from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
function App() {

  const [cartIsShow, setCartIsShown] = React.useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <React.Fragment>
    
    {cartIsShow==true && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
       <Meals />
      </main>
    </React.Fragment>
    
  );
}

export default App;
