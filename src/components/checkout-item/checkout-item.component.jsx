import CheckoutItemContainer from "./checkout-item.styles.jsx";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCartAction,
  decrementQuantityFromCartAction,
  removeItemFromCartAction,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const analytics = getAnalytics();
const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addItemToCart = (cartItem) =>
    dispatch(addItemToCartAction(cartItems, cartItem));
  const removeItemFromCart = (cartItem) =>
    dispatch(removeItemFromCartAction(cartItems, cartItem));
  const { name, quantity, imageUrl, price } = cartItem;
  const decrementQuantityFromCart = (cartItem) =>
    dispatch(decrementQuantityFromCartAction(cartItems, cartItem));

  const handleRemoveItem = () => {
    logEvent(analytics, "remove_from_cart", {
      currency: "USD",
      value: price * quantity,
      items: [cartItem],
    });
    removeItemFromCart(cartItem);
  };
  const handleIncrement = () => {
    addItemToCart(cartItem);
  };
  const handleDecrement = () => {
    if (quantity < 1)
      logEvent(analytics, "remove_from_cart", {
        currency: "USD",
        value: price * quantity,
        items: [cartItem],
      });
    decrementQuantityFromCart(cartItem);
  };
  return (
    <CheckoutItemContainer>
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={handleDecrement}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handleIncrement}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={handleRemoveItem}>
        &#10005;
      </div>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
