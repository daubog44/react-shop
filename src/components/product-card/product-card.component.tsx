import { FC } from "react";
import type { CategoryItem } from "../../store/categories/categories.types";
import type { CartItem } from "../../store/cart/cart.types";
import {
  ImageCardContainer,
  FooterCardContainer,
  ProductCardContainer,
  ButtonCardContainer,
} from "./product-card.styles";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartAction } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const analytics = getAnalytics();

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, price, imageUrl } = product;

  const addItemToCart = (cartItems: CartItem[], product: CategoryItem) =>
    dispatch(addItemToCartAction(cartItems, product));
  const addProductToCart = () => {
    logEvent<string>(analytics, "add_to_cart", {
      currency: "USD",
      value: price,
      items: [product],
    });
    return addItemToCart(cartItems, product);
  };

  return (
    <ProductCardContainer>
      <ImageCardContainer src={imageUrl} alt={`${name}`} />
      <FooterCardContainer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </FooterCardContainer>
      <ButtonCardContainer buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </ButtonCardContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
