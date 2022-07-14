import { useState } from "react";

import DisplayMessage from "../display-message/displayMessage.component";
import FormInput from "../form-input/form-input.component";
import { ButtonContainer } from "./sign-in-form.style.jsx";
import Button from "../button/button.component";
import {
  SignUpContainer,
  AuthTitle,
} from "../sign-up-form/sign-up-form.style.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectErrorState } from "../../store/user/user.selector";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  let errorState = useSelector(selectErrorState);
  const [acc, setAcc] = useState(0);

  const { email, password } = formFields;
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(emailSignInStart(email, password));
    resetFormFields();
    setTimeout(() => setAcc((prev) => prev + 1), 400);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      {errorState !== null && (
        <DisplayMessage key={acc} type="error" message={errorState} />
      )}
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
