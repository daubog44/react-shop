import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  decrementQuantityFromCart: () => null,
  removeItemFromCart: () => null,
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (item) => {
    setCartItems(addCartItem(cartItems, item));
  };

  const decrementQuantityFromCart = (item) => {
    setCartItems(removeCartItem(cartItems, item));
  };

  const removeItemFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    decrementQuantityFromCart,
    removeItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
