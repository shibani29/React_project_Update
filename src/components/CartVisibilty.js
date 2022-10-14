import { useState } from "react";
import { Fragment } from "react";

import Header from "./layout/Header";
import Cart from "./Cart/Cart.js";

function CartVisibility() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main></main>
    </Fragment>
  );
}

export default CartVisibility;
