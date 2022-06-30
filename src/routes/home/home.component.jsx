import Categories from "../../components/directory/directory.component";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

function Home() {
  const [categoriesHome, setCategoriesHome] = useState({});

  useEffect(() => {
    (async () => {
      const categoriesMap = await getCategoriesAndDocuments("categories-home");
      setCategoriesHome(categoriesMap);
    })();
  }, []);

  return (
    <div>
      <Outlet />
      <Categories categories={categoriesHome} />
    </div>
  );
}

export default Home;
