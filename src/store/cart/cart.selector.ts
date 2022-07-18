import type { RootState } from "../../store/store";
import type { CartState } from "./cart.reducer";
import { createSelector } from "reselect";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);
//selectCartItems

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  )
);
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);
