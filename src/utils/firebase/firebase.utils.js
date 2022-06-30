// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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
export const signInRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batches = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batches.set(docRef, obj);
  });

  await batches.commit();
  console.log("Collections and documents added");
};

export const getCategoriesAndDocuments = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, doc) => {
    const { title, items, imageUrl, id } = doc.data();
    if (items) {
      acc[title.toLowerCase()] = items;
      return acc;
    }
    acc[title.toLowerCase()] = { imageUrl, id };
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (auth, providerId) => {
  if (!auth) return;
  const userDocRef = doc(db, "users", auth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //check if user exists, if exists return document
  if (!userSnapshot.exists()) {
    const { displayName, email } = auth;
    const createdAt = new Date();
    logEvent(analytics, "sign_up", { method: providerId });

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  } else {
    logEvent(analytics, "login", { method: providerId });
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return "invalid";
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return "invalid";
  logEvent(analytics, "login", { method: "form" });
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
