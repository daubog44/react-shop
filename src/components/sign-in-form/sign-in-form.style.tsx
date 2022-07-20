import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 425px) {
    flex-direction: column;
    gap: 25px;
    width: 100%;
    align-items: center;
  }
`;
