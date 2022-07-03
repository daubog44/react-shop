import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_HOME_ACTION_TYPE } from "./categories-home.types";

export const setCategoriesHomeMap = (categoriesHomeArray) =>
  createAction(CATEGORIES_HOME_ACTION_TYPE.SET_CATEGORIES, categoriesHomeArray);
