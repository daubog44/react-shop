import { FC, ButtonHTMLAttributes } from "react";
import {
  ButtonStyle,
  ButtonSpinner,
  googleTheme,
  ivertedTheme,
} from "./button.styles";

export type ButtonProps = {
  buttonType?: "google" | "inverted";
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading = false,
  ...otherProps
}) => {
  const theme = () => {
    if (buttonType === "google") return googleTheme;
    else if (buttonType === "inverted") return ivertedTheme;
  };

  return (
    <ButtonStyle disabled={isLoading} theme={theme()} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </ButtonStyle>
  );
};

export default Button;
