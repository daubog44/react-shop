// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClOAZ8O1IeTLqCfc4irjunZ41uOg_xeck",
  authDomain: "pure-pact-333823.firebaseapp.com",
  projectId: "pure-pact-333823",
  storageBucket: "pure-pact-333823.appspot.com",
  messagingSenderId: "953257824879",
  appId: "1:953257824879:web:66f4177541b9da5217b39a",
  measurementId: "G-8GQLD9SZWP",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signIn = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (auth, providerId) => {
  const userDocRef = doc(db, "users", auth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //check if user exists, if exists return document
  if (!userSnapshot.exists()) {
    const { displayName, email } = auth;
    const createdAt = new Date();

    try {
      logEvent(analytics, "sign_up", { method: providerId });
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  logEvent(analytics, "login", { method: providerId });
  return userDocRef;
};
