import { useContext } from "react";
import { CartContext } from "../../../contexts/cart.context";
import CheckoutItem from "../../Checkout-items/Checkout-items.component";

import {CheckoutContainer, CheckoutHeader, HeaderBlock ,TotalPrice} from "./Checkout.styles"


const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <TotalPrice>Total: &euro;{cartTotal}</TotalPrice>
    </CheckoutContainer>
  );
};

export default Checkout;
