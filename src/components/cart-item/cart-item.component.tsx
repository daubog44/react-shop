import type { FC } from "react";
import type { CartItem } from "../../store/cart/cart.types";
import CartItemContainer from "./cart-item.styles";

type CartItemProps = {
  cartItem: CartItem;
};

const CartItemFC: FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </CartItemContainer>
  );
};

export default CartItemFC;
