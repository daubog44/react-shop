import Categories from "../../components/directory/directory.component";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { fetchCategoriesHomeStart } from "../../store/categories-home/categories-home.action";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoriesHome,
  selectIsCategoryLoading,
} from "../../store/categories-home/categories-home.selector";
import Spinner from "../../components/spinner/spinner.component";
import type { CategoryHome } from "../../store/categories-home/categories-home.types";

function Home() {
  const dispatch = useDispatch();
  const categoriesHome = useSelector(selectCategoriesHome);
  const isLoading = useSelector(selectIsCategoryLoading);
  useEffect(() => {
    dispatch(fetchCategoriesHomeStart());
  }, [dispatch]);

  const checkIfUnknown = (
    categoriesHome: unknown | CategoryHome[]
  ): categoriesHome is CategoryHome[] => {
    return Array.isArray(categoriesHome);
  };

  return (
    <div>
      <Outlet />
      {isLoading ? (
        <Spinner />
      ) : (
        checkIfUnknown(categoriesHome) && (
          <Categories categoriesHome={categoriesHome} />
        )
      )}
    </div>
  );
}

export default Home;
