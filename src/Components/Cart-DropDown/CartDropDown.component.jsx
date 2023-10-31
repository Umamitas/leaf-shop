import { useContext } from "react";
import Button from "../Button/Button.component";
import CartItem from "../Cart-item/CartItem.component";
import "./CartDropDown.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem cartItem={item} />
        ))}
      </div>
      <Button>Checkout</Button>
    </div>
  );
};
export default CartDropDown;
