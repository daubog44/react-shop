import styled from "styled-components";

export const ButtonStyle = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: ${(props) => props.theme.border};
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.colorHover};
    background-color: ${(props) => props.theme.backgroundColorHover};
    border: ${(props) => props.theme.borderHover};
  }
`;

ButtonStyle.defaultProps = {
  theme: {
    backgroundColor: "black",
    color: "white",
    border: "none",
    colorHover: "black",
    backgroundColorHover: "white",
    borderHover: "1px solid black",
  },
};

export const googleTheme = {
  backgroundColor: "#4285f4",
  color: "white",
  border: "none",
  colorHover: "black",
  backgroundColorHover: "#357ae8",
  borderHover: "none",
};

export const ivertedTheme = {
  backgroundColor: "white",
  color: "black",
  border: "1px solid black",
  colorHover: "white",
  backgroundColorHover: "black",
  borderHover: "none",
};
