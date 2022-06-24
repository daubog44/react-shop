import {
  signIn,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
//import { getAnalytics, logEvent } from "firebase/analytics";

const Signin = () => {
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
    </div>
  );
};

export default Signin;
