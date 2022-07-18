import {
  createAction,
  ActionWithPayload,
  Action,
  withMacthable,
} from "../../utils/reducer/reducer.utils";
import {
  CATEGORIES_HOME_ACTION_TYPE,
  CategoryHome,
} from "./categories-home.types";

export type FetchCateroriesHomeStart =
  Action<CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_START>;
export type FetchCateroriesHomeSuccess = ActionWithPayload<
  CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_SUCCESS,
  CategoryHome[]
>;
export type FetchCateroriesHomeFailed = ActionWithPayload<
  CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_FAILED,
  Error
>;

export const fetchCategoriesHomeStart = withMacthable(
  (): FetchCateroriesHomeStart => {
    return createAction(
      CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_START
    );
  }
);

export const fetchCategoriesHomeSuccess = withMacthable(
  (categoriesArray: CategoryHome[]): FetchCateroriesHomeSuccess =>
    createAction(
      CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesHomeFailed = withMacthable(
  (err: Error): FetchCateroriesHomeFailed => {
    return createAction(
      CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_FAILED,
      err
    );
  }
);
