import type { RootState } from "../../store/store";
import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);

export const selectIsUserLoggedIn = createSelector(
  selectUserReducer,
  (user) => user.isUserLoggedIn
);
export const selectLoadingState = createSelector(
  selectUserReducer,
  (user) => user.loading
);
export const selectErrorState = createSelector(
  selectUserReducer,
  (user) => user.error
);
