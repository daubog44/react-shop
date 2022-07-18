import { takeLatest, call, put, all } from "typed-redux-saga/macro";
import type { Category } from "./categories.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPE } from "./categories.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(
      getCategoriesAndDocuments,
      "categories"
    );
    yield* put(fetchCategoriesSuccess(categoriesArray as Category[]));
  } catch (error) {
    yield* put(fetchCategoriesFailure(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
