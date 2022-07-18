import { CategoryItem } from "../categories/categories.types";
import {
  createAction,
  ActionWithPayload,
  withMacthable,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  let newCartItems;
  if (cartItems.find((item) => item.id === productToAdd.id)) {
    newCartItems = cartItems.map((item) => {
      if (item.id === productToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  } else {
    newCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];
  }
  return newCartItems;
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  const decrementItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (decrementItem && decrementItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((item) => {
    if (item.id === productToRemove.id) {
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });
};

export type setIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMacthable(
  (CartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, CartItems)
);

export const addItemToCartAction = (
  cartItems: CartItem[],
  product: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, product);
  return setCartItems(newCartItems);
};

export const decrementQuantityFromCartAction = (
  cartItems: CartItem[],
  product: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, product);
  return setCartItems(newCartItems);
};

export const removeItemFromCartAction = (
  cartItems: CartItem[],
  product: CartItem
) => {
  const newCartItems = cartItems.filter(
    (item: CartItem) => item.id !== product.id
  );
  return setCartItems(newCartItems);
};

export const setIsCartOpenAction = withMacthable(
  (isCartOpen: boolean): setIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)
);
