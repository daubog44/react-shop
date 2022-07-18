import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { categoriesHomeReducer } from "./categories-home/categories-home.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  categoriesHome: categoriesHomeReducer,
  cart: cartReducer,
});
