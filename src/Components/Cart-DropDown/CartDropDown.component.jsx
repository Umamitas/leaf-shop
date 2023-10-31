import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button.component";
import CartItem from "../Cart-item/CartItem.component";
import "./CartDropDown.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckOutHandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckOutHandler}>Checkout</Button>
    </div>
  );
};
export default CartDropDown;
