import { fork, call, put, all, take } from "redux-saga/effects";

import { USER_ACTIONS_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  loadingStatus,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signIn,
  signInAuthWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    let snapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalData
    );
    if (!snapshot) throw new Error("No data");
    if (!snapshot.id) {
      throw new Error("No id");
    }
    console.log("data", { ...snapshot.data() });
    yield put(signInSuccess({ ...snapshot.data(), id: snapshot.id }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    yield put(loadingStatus(true));
    const { user } = yield call(signIn, "google");
    yield call(getSnapshotFromUserAuth, user, "google");
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmailAndPassword(payload) {
  try {
    yield put(loadingStatus(true));
    const { email, password } = payload;
    const { user } = yield call(
      signInAuthWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user, "sign-in-form");
  } catch (error) {
    yield put(signInFailed(error));
    if (error.code === "auth/user-not-found") {
      alert("User not registered");
    } else if (error.code === "auth/wrong-password") {
      alert("Wrong password");
    } else {
      console.error("Error creating user document", error);
    }
  }
}

export function* isUserAuthenticatedAsync() {
  try {
    yield put(loadingStatus(true));
    const user = yield call(getCurrentUser);
    if (!user) {
      yield put(loadingStatus(false));
      return;
    }
    yield call(getSnapshotFromUserAuth, user, "fromAuth");
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUpWithEmailAndPassword(payload) {
  try {
    yield put(loadingStatus(true));
    const { email, password, displayName } = payload;
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    user.displayName = displayName;
    user.email = email;
    yield call(getSnapshotFromUserAuth, user, "sign-up-form");
  } catch (error) {
    yield put(signInFailed(error));
    if (error.code === "auth/email-already-in-use") {
      alert("Email already in use");
    } else {
      console.error("Error creating user document", error);
    }
  }
}

export function* signOutUserSaga() {
  try {
    yield put(loadingStatus(true));
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* fecthAll() {
  while (true) {
    let { type, payload } = yield take([
      USER_ACTIONS_TYPES.CHECK_USER_SESSION,
      USER_ACTIONS_TYPES.SIGNOUT_START,
      USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START,
      USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START,
      USER_ACTIONS_TYPES.EMAIL_SIGNUP_START,
    ]);
    switch (type) {
      case USER_ACTIONS_TYPES.CHECK_USER_SESSION:
        yield fork(isUserAuthenticatedAsync);
        break;
      case USER_ACTIONS_TYPES.SIGNOUT_START:
        yield fork(signOutUserSaga);
        break;
      case USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START:
        yield fork(signInWithGoogle);
        break;
      case USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START:
        yield fork(signInWithEmailAndPassword, payload);
        break;
      case USER_ACTIONS_TYPES.EMAIL_SIGNUP_START:
        yield fork(signUpWithEmailAndPassword, payload);
        break;
      default:
        break;
    }
  }
}

export function* userSagas() {
  yield all([fecthAll()]);
}