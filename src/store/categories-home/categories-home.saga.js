import { takeLatest, call, put, all } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesHomeSuccess,
  fetchCategoriesHomeFailed,
} from "./categories-home.action";

import { CATEGORIES_HOME_ACTION_TYPE } from "./categories-home.types";

export function* fetchCategoriesHomeAsync() {
  try {
    const categoriesArray = yield call(
      getCategoriesAndDocuments,
      "categories-home"
    );
    yield put(fetchCategoriesHomeSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesHomeFailed(error));
  }
}

export function* onFetchCategoriesHomeSaga() {
  yield takeLatest(
    CATEGORIES_HOME_ACTION_TYPE.FETCH_CATEGORIES_HOME_START,
    fetchCategoriesHomeAsync
  );
}

export function* categoriesHomeSaga() {
  yield all([call(onFetchCategoriesHomeSaga)]);
}
