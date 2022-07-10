import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/categories.saga";
import { categoriesHomeSaga } from "./categories-home/categories-home.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {
  yield all([call(categoriesHomeSaga), call(categoriesSaga), call(userSagas)]);
}
