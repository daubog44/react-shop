// import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
  // auth,
  signIn,
  createUserDocumentFromAuth,
  // signInRedirect,
} from "../../utils/firebase/firebase.utils";
//import { getAnalytics, logEvent } from "firebase/analytics";

const Signin = () => {
  // useEffect(() => {
  //   (async function fetchData() {
  //     const res = await getRedirectResult(auth);
  //     if (res) {
  //       const userDoc = await createUserDocumentFromAuth(
  //         res.user,
  //         res.providerId
  //       );
  //     }
  //   })();
  // }, []);

  // const logGoogleUserRedirect = async () => {
  //   const auth = await signInRedirect();
  // };

  const logGoogleUser = async () => {
    const auth = await signIn();
    const userDoc = await createUserDocumentFromAuth(
      auth.user,
      auth.providerId
    );
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google</button>
      {/* <button onClick={logGoogleUserRedirect}>
        Sign In with Google and Redirect
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default Signin;
