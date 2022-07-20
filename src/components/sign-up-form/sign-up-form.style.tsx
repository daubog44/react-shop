import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  @media screen and (max-width: 425px) {
    width: 100%;
  }
`;

export const AuthTitle = styled.h2`
  margin: 10px 0;
  @media screen and (max-width: 425px) {
    margin: 0 auto;
  }
`;

export const SubTitleAuth = styled.span`
  @media screen and (max-width: 425px) {
    margin: 0 auto;
  }
`;
