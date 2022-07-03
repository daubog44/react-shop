import CartIconContainer from "./cart-icon.styles.jsx";
import { ReactComponent as CartIcon } from "../../assets/shopping-bag.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsCartOpen,
  selectCartItemCount,
} from "../../store/cart/cart.selector";

import { setIsCartOpenAction } from "../../store/cart/cart.action";

const CartIcons = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartItemCount);
  const toggleIsCartOpen = () => dispatch(setIsCartOpenAction(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <CartIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </CartIconContainer>
  );
};

export default CartIcons;
