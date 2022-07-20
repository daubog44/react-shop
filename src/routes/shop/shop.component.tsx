import CategoriesPreview from "../../components/categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from "../../components/category/category.component";
import { useEffect } from "react";
import { fetchCategoriesStart } from "../../store/categories/categories.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";

const Shop = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      dispatch(fetchCategoriesStart());
    }
  }, [dispatch, categories]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
