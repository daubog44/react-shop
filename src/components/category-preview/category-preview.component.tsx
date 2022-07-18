import type { FC } from "react";
import type { CategoryItem } from "../../store/categories/categories.types";
import CategoryPreviewContainer from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";

type CategoryPreviewProps = {
  products: CategoryItem[];
  title: string;
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, i) => i < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
