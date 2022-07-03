import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";

const analytics = getAnalytics();
const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategories);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product, i) => {
            if (i === category.length - 1)
              logEvent(analytics, "view_item_list", {
                item_list_id: category,
                item_list_name: category,
                items: products,
              });
            return <ProductCard key={product.id} product={product} />;
          })}
      </CategoryContainer>
    </>
  );
};

export default Category;
