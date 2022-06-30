import CartIconContainer from "./cart-icon.styles.jsx";
import { useContext } from "react";
import { ReactComponent as CartIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";

const CartIcons = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <CartIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </CartIconContainer>
  );
};

export default CartIcons;
