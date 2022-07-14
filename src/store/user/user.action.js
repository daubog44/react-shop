import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTIONS_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user);

/**
    CHECK_USER_SESSION: "CHECK_USER_SESSION",
  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILED: "SIGN_IN_FAILED",

  */

export const checkUserSession = () =>
  createAction(USER_ACTIONS_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password,
  });

export const emailSignupStart = (email, password, displayName) =>
  createAction(USER_ACTIONS_TYPES.EMAIL_SIGNUP_START, {
    email,
    password,
    displayName,
  });

export const signInSuccess = (user) => {
  return createAction(USER_ACTIONS_TYPES.SIGN_IN_SUCCESS, user);
};

export const signInFailed = (error) =>
  createAction(USER_ACTIONS_TYPES.SIGN_IN_FAILED, error);

export const signOutStart = () =>
  createAction(USER_ACTIONS_TYPES.SIGNOUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTIONS_TYPES.SIGNOUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTIONS_TYPES.SIGNOUT_FAILED, error);

export const loadingStatus = (payload) =>
  createAction(USER_ACTIONS_TYPES.LOADING_STATUS, payload);
