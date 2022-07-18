import type { CategoryHome } from "./categories-home.types";
import { takeLatest, call, put, all } from "typed-redux-saga/macro";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesHomeSuccess,
  fetchCategoriesHomeFailed,
} from "./categories-home.action";

import { CATEGORIES_HOME_ACTION_TYPE } from "./categories-home.types";

export function* fetchCategoriesHomeAsync() {
  try {
    const categoriesArray = yield* call(
      getCategoriesAndDocuments,
      "categories-home"
    );
    yield* put(fetchCategoriesHomeSuccess(categoriesArray as CategoryHome[]));
  } catch (error) {
    yield* put(fetchCategoriesHomeFailed(error as Error));
  }
}

export function* onFetchCategoriesHomeSaga() {
  yield* takeLatest(
    CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_START,
    fetchCategoriesHomeAsync
  );
}

export function* categoriesHomeSaga() {
  yield* all([call(onFetchCategoriesHomeSaga)]);
}
