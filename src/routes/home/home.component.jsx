import Categories from "../../components/directory/directory.component";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesHomeMap } from "../../store/categories-home/categories-home.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesHome } from "../../store/categories-home/categories-home.selector";

function Home() {
  const dispatch = useDispatch();
  const categoriesHome = useSelector(selectCategoriesHome);

  useEffect(() => {
    (async () => {
      const categoriesArray = await getCategoriesAndDocuments(
        "categories-home"
      );
      dispatch(setCategoriesHomeMap(categoriesArray));
    })();
  }, [dispatch]);

  return (
    <div>
      <Outlet />
      <Categories categories={categoriesHome} />
    </div>
  );
}

export default Home;
