import { CATEGORIES_HOME_ACTION_TYPE } from "./categories-home.types";
const INITIAL_STATE = { categories: [] };

export const categoriesHomeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_HOME_ACTION_TYPE.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
