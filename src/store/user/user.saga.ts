import { call, put, all, take } from "typed-redux-saga/macro";
import { Auth } from "../../utils/firebase/firebase.utils";
import { User, UserCredential } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

import {
  checkUserSession,
  signInSuccess,
  signInFailed,
  emailSignupStart,
  emailSignInStart,
  googleSignInStart,
  signOutStart,
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

export function* getSnapshotFromUserAuth(
  userAuth: Auth | User,
  additionalData?: string
) {
  try {
    let snapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalData
    );
    if (!snapshot) throw new Error("No data");
    if (!snapshot.id) {
      throw new Error("No id");
    }
    if (snapshot)
      yield* put(signInSuccess({ ...snapshot.data(), id: snapshot.id }));
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const data = yield* call(signIn, "google");

    yield* call(getSnapshotFromUserAuth, data.user as Auth, "google");
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmailAndPassword(email: string, password: string) {
  try {
    const userCredentials = yield* call(
      signInAuthWithEmailAndPassword,
      email,
      password
    );
    if (userCredentials) {
      const { user } = userCredentials as UserCredential;
      yield* call(getSnapshotFromUserAuth, user, "sign-in-form");
    }
  } catch (error) {
    let errorMessage;
    if (error instanceof FirebaseError) {
      if (error.code === "auth/user-not-found") {
        errorMessage = "User not registered";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Wrong password";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests";
      } else {
        errorMessage = error.message;
      }
    } else {
      errorMessage = error as Error;
      errorMessage = errorMessage.message;
    }
    yield* put(signInFailed(errorMessage as string));
  }
}

export function* isUserAuthenticatedAsync() {
  try {
    const user = yield* call(getCurrentUser);
    if (!user) {
      yield* put(loadingStatus(false));
      return;
    }
    yield* call(getSnapshotFromUserAuth, user, "fromAuth");
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUpWithEmailAndPassword(
  email: string,
  password: string,
  displayName: string
) {
  try {
    const userCredentials = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredentials) {
      const { user } = userCredentials as UserCredential;
      user.displayName = displayName;
      user.email = email;
      yield* call(getSnapshotFromUserAuth, user, "sign-up-form");
    }
  } catch (error) {
    let errorMessage;
    if (
      error instanceof FirebaseError &&
      error.code === "auth/email-already-in-use"
    ) {
      errorMessage = "Email already in use";
    } else {
      errorMessage = error as Error;
      errorMessage = errorMessage.message;
    }

    yield* put(signInFailed(errorMessage));
  }
}

export function* signOutUserSaga() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* fecthAll() {
  while (true) {
    let action = yield* take([
      checkUserSession.type,
      emailSignInStart.type,
      signOutStart.type,
      googleSignInStart.type,
      emailSignupStart.type,
    ]);

    if (checkUserSession.match(action)) {
      yield* put(loadingStatus(true));
      yield* call(isUserAuthenticatedAsync);
    }
    if (signOutStart.match(action)) {
      yield* put(loadingStatus(true));
      yield* call(signOutUserSaga);
    }

    if (googleSignInStart.match(action)) {
      console.log("action", action);
      yield* put(loadingStatus(true));
      yield* call(signInWithGoogle);
    }

    if (emailSignInStart.match(action)) {
      const { payload } = action as ReturnType<typeof emailSignInStart>;
      yield* put(loadingStatus(true));
      yield* call(signInWithEmailAndPassword, payload.email, payload.password);
    }

    if (emailSignupStart.match(action)) {
      const { payload } = action as ReturnType<typeof emailSignupStart>;
      yield* put(loadingStatus(true));
      yield* call(
        signUpWithEmailAndPassword,
        payload.email,
        payload.password,
        payload.displayName
      );
    }
  }
}

export function* userSagas() {
  yield* all([fecthAll()]);
}
