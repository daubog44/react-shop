import {
  CATEGORIES_ACTION_TYPE,
  CategoryItem,
  Category,
} from "./categories.types";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMacthable,
} from "../../utils/reducer/reducer.utils";

export type FetchCateroriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCateroriesStart =
  Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START>;

export type FetchCateroriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED,
  Error
>;

export const fetchCategoriesStart = withMacthable(
  (): FetchCateroriesStart =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMacthable(
  (categoriesArray: Category[]): FetchCateroriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesFailure = withMacthable(
  (error: Error): FetchCateroriesFailed =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error)
);
