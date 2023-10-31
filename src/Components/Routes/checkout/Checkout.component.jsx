import { useContext } from "react";
import { CartContext } from "../../../contexts/cart.context";

import "./Checkout.styles.scss";
import CheckoutItem from "../../Checkout-items/Checkout-items.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <dir className="checkout-header">
        <div className="header-bloc">
          <span>Product</span>
        </div>

        <div className="header-bloc">
          <span>Description</span>
        </div>

        <div className="header-bloc">
          <span>Quantity</span>
        </div>

        <div className="header-bloc">
          <span>Price</span>
        </div>

        <div className="header-block">
          <span>Remove</span>
        </div>
      </dir>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total-price">Total: &euro;{cartTotal}</span>
    </div>
  );
};

export default Checkout;
