import type { FC } from "react";
import type { CategoryHome } from "../../store/categories-home/categories-home.types";
import DirectoryItem from "../directory-item/directory-item.component";
import styled from "styled-components";

const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

type DirectoryProps = {
  categoriesHome: CategoryHome[];
};

const Directory: FC<DirectoryProps> = ({ categoriesHome }) => {
  return (
    <DirectoryContainer>
      {categoriesHome.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;
