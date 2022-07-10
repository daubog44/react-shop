import { useSelector } from "react-redux";
import {
  selectIsCartOpen,
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { useEffect } from "react";
import {
  CartDropdownContainer,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";
import Button from "../../components/button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
import { firebaseApp } from "../../utils/firebase/firebase.utils";

const analytics = getAnalytics(firebaseApp);
const CartDropdown = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    logEvent(analytics, "begin_checkout", {
      currency: "USD",
      value: cartTotal,
      items: cartItems,
    });
    navigate("/checkout");
  };

  useEffect(() => {
    if (isCartOpen)
      logEvent(analytics, "view_cart", {
        currency: "USD",
        value: cartTotal,
        items: cartItems,
      });
  }, [isCartOpen, cartItems, cartTotal]);

  return (
    <CartDropdownContainer>
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
