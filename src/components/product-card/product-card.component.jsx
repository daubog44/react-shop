import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import {
  ImageCardContainer,
  FooterCardContainer,
  ProductCardContainer,
  ButtonCardContainer,
} from "./product-card.styles.jsx";
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();
const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
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
