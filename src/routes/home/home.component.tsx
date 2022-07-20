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
import type {
  CategoryHome,
  CategoryHomeMap,
} from "../../store/categories-home/categories-home.types";

function Home() {
  const dispatch = useDispatch();
  const categoriesHome = useSelector(selectCategoriesHome);
  const isLoading = useSelector(selectIsCategoryLoading);

  useEffect(() => {
    if (Object.keys(categoriesHome).length === 0) {
      dispatch(fetchCategoriesHomeStart());
    }
  }, [dispatch, categoriesHome]);

  const checkIfUnknown = (
    categoriesHome: unknown | CategoryHomeMap
  ): categoriesHome is CategoryHomeMap => {
    return categoriesHome !== undefined;
  };

  const modifiedData = () => {
    const values = Object.values(categoriesHome);
    const arr: CategoryHome[] = [];
    values.forEach((value: CategoryHome) => {
      arr.push(value);
    });
    return arr;
  };

  return (
    <div>
      <Outlet />
      {isLoading ? (
        <Spinner />
      ) : (
        checkIfUnknown(categoriesHome) && (
          <Categories categoriesHome={modifiedData()} />
        )
      )}
    </div>
  );
}

export default Home;
