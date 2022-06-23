import categories from "./categories.json";
import CategoryItem from "../category-item/category-item.component";
import "./categories.styles.scss";

const Categories = () => {
  return (
    <div className="categories-container">
      {categories.map((data) => (
        <CategoryItem key={data.id} category={data} />
      ))}
    </div>
  );
};

export default Categories;
