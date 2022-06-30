import { useState } from "react";
import {
  signIn,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import { ButtonContainer } from "./sign-in-form.style.jsx";
import Button from "../button/button.component";
import {
  SignUpContainer,
  AuthTitle,
} from "../sign-up-form/sign-up-form.style.jsx";

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
    <SignUpContainer>
      <AuthTitle>Already have an account?</AuthTitle>
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

        <ButtonContainer>
          <Button children="Sign In" buttonType="default" type="submit" />
          <Button
            onClick={signInWithGoogle}
            children="Google Sign In"
            buttonType="google"
            type="button"
          />
        </ButtonContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
