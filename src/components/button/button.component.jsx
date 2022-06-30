import { ButtonStyle, googleTheme, ivertedTheme } from "./button.styles.jsx";

const Button = ({ children, buttonType, ...otherProps }) => {
  const theme = () => {
    if (buttonType === "google") return googleTheme;
    else if (buttonType === "inverted") return ivertedTheme;
  };

  return (
    <ButtonStyle theme={theme()} {...otherProps}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
