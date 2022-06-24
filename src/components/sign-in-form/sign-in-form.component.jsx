import { useState } from "react";
import {
  signIn,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./sign-in-form.style.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInAuthWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found");
          break;
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        default:
          console.error("Error signing in", error);
      }
    }
  };

  const signInWithGoogle = async () => {
    const auth = await signIn();
    await createUserDocumentFromAuth(auth.user, auth.providerId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          minLength="6"
        />

        <div className="buttons-container">
          <Button children="Sign In" buttonType="default" type="submit" />
          <Button
            onClick={signInWithGoogle}
            children="Google Sign In"
            buttonType="google"
            type="button"
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
