import { USER_ACTIONS_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isUserLoggedIn: false,
  loading: true,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTIONS_TYPES.LOADING_STATUS:
      return {
        ...state,
        loading: payload,
      };
    case USER_ACTIONS_TYPES.SIGNOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        loading: false,
        isUserLoggedIn: false,
        error: null,
      };
    case USER_ACTIONS_TYPES.SIGNOUT_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
        isUserLoggedIn: true,
      };
    case USER_ACTIONS_TYPES.SIGN_IN_SUCCESS:
      console.log("payload", payload);
      return {
        ...state,
        currentUser: payload,
        loading: false,
        isUserLoggedIn: true,
        error: null,
      };
    case USER_ACTIONS_TYPES.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
        isUserLoggedIn: false,
      };
    default:
      return state;
  }
};
