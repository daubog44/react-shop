import { useState, FormEvent, ChangeEvent } from "react";

import DisplayMessage from "../display-message/displayMessage.component";
import FormInput from "../form-input/form-input.component";
import { SignUpContainer, AuthTitle, SubTitleAuth } from "./sign-up-form.style";
import Button from "../button/button.component";

import { useDispatch, useSelector } from "react-redux";
import { selectErrorState } from "../../store/user/user.selector";
import { emailSignupStart, signInFailed } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const error = useSelector(selectErrorState);
  const [acc, setAcc] = useState(0);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(signInFailed("Passwords do not match"));
      setAcc((prev) => prev + 1);
    } else dispatch(emailSignupStart(email, password, displayName));
    resetFormFields();
    setTimeout(() => setAcc((prev) => prev + 1), 400);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      {/* {error !== null && (
        <DisplayMessage type="error" message={error as string} key={acc} />
      )} */}
      <AuthTitle>Don't have an account?</AuthTitle>
      <SubTitleAuth>Sign up with your email and password</SubTitleAuth>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
          minLength={6}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          minLength={6}
        />
        <Button children="Sign Up" type="submit" />
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
