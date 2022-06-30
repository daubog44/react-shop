import { css } from "styled-components";
import styled from "styled-components";

const shrinkLabel = (mainColor = "black") => css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const Group = styled.div.attrs((props) => ({
  subColor: "grey",
}))`
  position: relative;
  margin: 45px 0;
  ${(props) => {
    console.log(props.children);
  }}

  & .form-input {
    background: none;
    background-color: white;
    color: ${(props) => props.subColor};
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${(props) => props.subColor};
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:focus ~ .form-input-label {
      ${shrinkLabel()}
    }
  }

  input[type="password"] {
    letter-spacing: 0.3em;
  }

  & .form-input-label {
    color: ${(props) => props.subColor};
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;

    &__shrink {
      ${shrinkLabel()}
    }
  }
`;
