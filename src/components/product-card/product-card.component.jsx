import {
  ImageCardContainer,
  FooterCardContainer,
  ProductCardContainer,
  ButtonCardContainer,
} from "./product-card.styles.jsx";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartAction } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const analytics = getAnalytics();
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const addItemToCart = (cartItem) =>
    dispatch(addItemToCartAction(cartItems, cartItem));
  const addProductToCart = () => {
    logEvent(analytics, "add_to_cart", {
      currency: "USD",
      value: price,
      items: [product],
    });
    return addItemToCart(product);
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
