import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 30px auto;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 50px;
    width: 100%;
    align-items: center;
  }
`;
