import CategoryPreview from "../category-preview/category-preview.component";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectIsCategoryLoading,
} from "../../store/categories/categories.selector";
import Spinner from "../spinner/spinner.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectIsCategoryLoading);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </>
  );
};

export default CategoriesPreview;
