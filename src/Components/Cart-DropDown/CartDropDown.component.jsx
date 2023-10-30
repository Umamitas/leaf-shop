import Button from "../Button/Button.component";
import "./CartDropDown.styles.scss";

const CartDropDown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button>Checkout</Button>
    </div>
  );
};
export default CartDropDown;
