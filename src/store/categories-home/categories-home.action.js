import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_HOME_ACTION_TYPE } from "./categories-home.types";

export const fetchCategoriesHomeStart = () => {
  return createAction(CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_START);
};

export const fetchCategoriesHomeSuccess = (categoriesArray) => {
  return createAction(
    CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_SUCCESS,
    categoriesArray
  );
};

export const fetchCategoriesHomeFailed = (err) => {
  return createAction(
    CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_FAILED,
    err
  );
};
