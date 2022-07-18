import {
  createAction,
  withMacthable,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { USER_ACTIONS_TYPES } from "./user.types";
import type { UserData } from "../../utils/firebase/firebase.utils";

export type checkUserSessionType =
  Action<USER_ACTIONS_TYPES.CHECK_USER_SESSION>;
export type setCurrentUserType = ActionWithPayload<
  USER_ACTIONS_TYPES.SET_CURRENT_USER,
  UserData
>;
export type googleSignInStartType =
  Action<USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START>;
export type emailSignInStartType = ActionWithPayload<
  USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;
export type emailSignupStartType = ActionWithPayload<
  USER_ACTIONS_TYPES.EMAIL_SIGNUP_START,
  { email: string; password: string; displayName: string }
>;
export type signInSuccessType = ActionWithPayload<
  USER_ACTIONS_TYPES.SIGN_IN_SUCCESS,
  UserData
>;
export type signInFailedType = ActionWithPayload<
  USER_ACTIONS_TYPES.SIGN_IN_FAILED,
  string | Error
>;
export type signOutStartType = Action<USER_ACTIONS_TYPES.SIGNOUT_START>;
export type signOutSuccessType = Action<USER_ACTIONS_TYPES.SIGNOUT_SUCCESS>;
export type signOutFailedType = ActionWithPayload<
  USER_ACTIONS_TYPES.SIGNOUT_FAILED,
  string | Error
>;

export const setCurrentUser = withMacthable(
  (user: UserData): setCurrentUserType =>
    createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user)
);

export const checkUserSession = withMacthable(
  (): checkUserSessionType =>
    createAction(USER_ACTIONS_TYPES.CHECK_USER_SESSION)
);

export const googleSignInStart = withMacthable(
  (): googleSignInStartType =>
    createAction(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMacthable(
  (email: string, password: string): emailSignInStartType =>
    createAction(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, {
      email,
      password,
    })
);
export type loadingStatusType = ActionWithPayload<
  USER_ACTIONS_TYPES.LOADING_STATUS,
  boolean
>;

export const emailSignupStart = withMacthable(
  (
    email: string,
    password: string,
    displayName: string
  ): emailSignupStartType =>
    createAction(USER_ACTIONS_TYPES.EMAIL_SIGNUP_START, {
      email,
      password,
      displayName,
    })
);

export const signInSuccess = withMacthable(
  (user: UserData & { id: string }): signInSuccessType => {
    return createAction(USER_ACTIONS_TYPES.SIGN_IN_SUCCESS, user);
  }
);

export const signInFailed = withMacthable(
  (error: Error | string): signInFailedType =>
    createAction(USER_ACTIONS_TYPES.SIGN_IN_FAILED, error)
);

export const signOutStart = withMacthable(
  (): signOutStartType => createAction(USER_ACTIONS_TYPES.SIGNOUT_START)
);

export const signOutSuccess = withMacthable(
  (): signOutSuccessType => createAction(USER_ACTIONS_TYPES.SIGNOUT_SUCCESS)
);

export const signOutFailed = withMacthable(
  (error: string | Error): signOutFailedType =>
    createAction(USER_ACTIONS_TYPES.SIGNOUT_FAILED, error)
);

export const loadingStatus = withMacthable(
  (payload: boolean): loadingStatusType =>
    createAction(USER_ACTIONS_TYPES.LOADING_STATUS, payload)
);
