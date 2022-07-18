import { Outlet } from "react-router-dom";
import { ReactComponent as CrwonLogo } from "../../assets/crown.svg";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsUserLoggedIn } from "../../store/user/user.selector";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles";
import { signOutStart } from "../../store/user/user.action";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const isCartOpen = useSelector(selectIsCartOpen);
  const signOutUser = () => dispatch(signOutStart());
  // isUserLoggedIn
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwonLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">Shop</NavLink>
          {isUserLoggedIn ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGNOUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
