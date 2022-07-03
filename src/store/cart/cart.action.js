import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, productToRemove) => {
  const decrementItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (decrementItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((item) => {
    if (item.id === productToRemove.id) {
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });
};

export const addItemToCartAction = (cartItems, product) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decrementQuantityFromCartAction = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCartAction = (cartItems, product) => {
  const newCartItems = cartItems.filter((item) => item.id !== product.id);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpenAction = (isCartOpen) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
};
