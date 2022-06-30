import { DirectoryItemContainer } from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => {
  const { key, imageUrl } = category;

  return (
    <DirectoryItemContainer to={`/shop/${key}`}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})`, objectFit: "cover" }}
      />
      <div className="directory-item-body">
        <h2>{key}</h2>
        <p>Shop Now</p>
      </div>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
