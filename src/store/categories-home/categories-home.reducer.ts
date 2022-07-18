import { AnyAction } from "redux";
import { CategoryHome } from "./categories-home.types";
import {
  fetchCategoriesHomeStart,
  fetchCategoriesHomeSuccess,
  fetchCategoriesHomeFailed,
} from "./categories-home.action";

export type CategoryHomeState = {
  readonly categories: CategoryHome[];
  readonly isLoading: boolean;
  readonly error: Error | null | string;
};

const INITIAL_STATE: CategoryHomeState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesHomeReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CategoryHomeState => {
  if (fetchCategoriesHomeStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (fetchCategoriesHomeSuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  }

  if (fetchCategoriesHomeFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }
  return state;
};
