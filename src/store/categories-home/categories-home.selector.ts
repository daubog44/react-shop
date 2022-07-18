import type { RootState } from "../../store/store";
import type { CategoryHomeMap } from "./categories-home.types";
import type { CategoryHomeState } from "./categories-home.reducer";
import { createSelector } from "reselect";

const selectCategoryHomeReducer = (state: RootState): CategoryHomeState =>
  state.categoriesHome;

export const selectCategoriesHomeSlice = createSelector(
  [selectCategoryHomeReducer],
  (categories) => categories.categories
);

export const selectCategoriesHome = createSelector(
  [selectCategoriesHomeSlice],
  (categories): CategoryHomeMap =>
    categories.reduce((acc, category) => {
      const { title } = category;
      acc[title.toLowerCase()] = category;
      return acc;
    }, {} as CategoryHomeMap)
);

export const selectIsCategoryLoading = createSelector(
  [selectCategoryHomeReducer],
  (categories) => categories.isLoading
);
