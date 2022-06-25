import "./cart-icon.styles.scss";
import { useContext } from "react";
import { ReactComponent as CartIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";

const CartIcons = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <CartIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcons;
