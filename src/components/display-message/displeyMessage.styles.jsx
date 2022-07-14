import styled from "styled-components";

export const Message = styled.div`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  position: fixed;
  top: 0px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: 9999;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 16px 30px;
  -webkit-box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.3s ease-in-out;
`;

export const errorTheme = {
  backgroundColor: "#eb4d4b",
};

export const successTheme = {
  backgroundColor: "#20bf6b",
};

export const ClosePopup = styled(Message)`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  cursor: pointer;
  position: relative;
  top: -16px;
  padding: 0px;
  border-radius: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: black;
  color: white;

  &:hover {
    color: black;
    background-color: white;
  }
`;
