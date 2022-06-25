import "./cart-dropdown.styles.scss";
import Button from "../../components/button/button.component";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button>go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
