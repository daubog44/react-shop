import type { FC } from "react";
import type { CategoryHome } from "../../store/categories-home/categories-home.types";
import { DirectoryItemContainer } from "./directory-item.styles";

type DirectoryItemProps = {
  category: CategoryHome;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { title, imageUrl } = category;

  return (
    <DirectoryItemContainer to={`/shop/${title}`}>
       <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})`, objectFit: "cover" }}
      /> 
      <div className="directory-item-body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
