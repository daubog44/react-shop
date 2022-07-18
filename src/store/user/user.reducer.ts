import { AnyAction } from "redux";
import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  loadingStatus,
} from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly loading: boolean;
  readonly isUserLoggedIn: boolean;
  readonly error: Error | string | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isUserLoggedIn: false,
  loading: true,
  error: null,
};

export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isUserLoggedIn: true,
      loading: false,
      error: null,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
      isUserLoggedIn: false,
      loading: false,
      error: null,
    };
  }

  if (signInFailed.match(action) || signOutFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  }

  if (loadingStatus.match(action)) {
    return {
      ...state,
      loading: action.payload,
    };
  }

  return state;
};
