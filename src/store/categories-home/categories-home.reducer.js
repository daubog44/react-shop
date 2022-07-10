import { CATEGORIES_HOME_ACTION_TYPE } from "./categories-home.types";
const INITIAL_STATE = { categories: [], isLoading: false, error: null };

export const categoriesHomeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false,
      };
    case CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
