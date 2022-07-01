import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cart.context";
import {
  CartDropdownContainer,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";
import Button from "../../components/button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();
const CartDropdown = () => {
  const { cartItems, isCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    logEvent(analytics, "begin_checkout", {
      currency: "USD",
      value: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ), // Total Revenue
      items: cartItems,
    });
    navigate("/checkout");
  };

  useEffect(() => {
    if (isCartOpen)
      logEvent(analytics, "view_cart", {
        currency: "USD",
        value: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        items: cartItems,
      });
  }, [cartItems, isCartOpen]);

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
