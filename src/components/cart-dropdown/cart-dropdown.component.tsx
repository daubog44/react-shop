import { useSelector } from "react-redux";
import {
  selectIsCartOpen,
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { useEffect, useCallback } from "react";
import { CartDropdownContainer, EmptyMessage } from "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItemFC from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import { firebaseApp } from "../../utils/firebase/firebase.utils";

const analytics = getAnalytics(firebaseApp);
const CartDropdown = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    logEvent<string>(analytics, "begin_checkout", {
      currency: "USD",
      value: cartTotal,
      items: cartItems,
    });
    navigate("/checkout");
  }, [cartTotal, cartItems]);

  useEffect(() => {
    if (isCartOpen)
      logEvent<string>(analytics, "view_cart", {
        currency: "USD",
        value: cartTotal,
        items: cartItems,
      });
  }, [isCartOpen, cartItems, cartTotal]);

  return (
    <CartDropdownContainer>
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItemFC key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
