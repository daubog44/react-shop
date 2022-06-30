import DirectoryItem from "../directory-item/directory-item.component";
import styled from "styled-components";

const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Directory = ({ categories }) => {
  return (
    <DirectoryContainer>
      {Object.keys(categories).length > 0
        ? Object.keys(categories).map((key) => {
            return (
              <DirectoryItem key={key} category={{ ...categories[key], key }} />
            );
          })
        : null}
    </DirectoryContainer>
  );
};

export default Directory;
