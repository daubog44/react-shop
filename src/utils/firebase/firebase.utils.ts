// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
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
  setLogLevel,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../../store/categories/categories.types";
import { CategoryHome } from "../../store/categories-home/categories-home.types";

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
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signIn = () => signInWithPopup(auth, provider);
export const signInRedirect = () => signInWithRedirect(auth, provider);
if (process.env.NODE_ENV === "debug") setLogLevel("debug");

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batches = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batches.set(docRef, obj);
  });

  await batches.commit();
};

export type dataDB = Category | CategoryHome;

export const getCategoriesAndDocuments = async (
  collectionName: string
): Promise<dataDB[]> => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as dataDB);
};

export type Auth = { displayName?: string; email?: string } & User;

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  auth: Auth | User,
  providerId = "auth"
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!auth) return;
  const userDocRef = doc(db, "users", auth.uid);
  setUserId(analytics, auth.uid);
  let userSnapshot = await getDoc(userDocRef);
  const { displayName, email } = auth;

  //check if user exists, if exists return document
  if (!userSnapshot.exists()) {
    const createdAt = new Date().toLocaleDateString();
    logEvent(analytics, "sign_up", { method: providerId });

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
      userSnapshot = await getDoc(userDocRef);
    } catch (error) {
      console.error("Error creating user document", error);
    }
  } else {
    logEvent(analytics, "login", { method: providerId });
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return "invalid";
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return "invalid";
  logEvent(analytics, "login", { method: "form" });
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (
  callback: NextOrObserver<
    ({ displayName?: string; email?: string } & User) | User
  >
) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<
  ({ displayName?: string; email?: string } & User) | User | null
> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};
