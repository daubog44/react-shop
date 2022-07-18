import type { RootState } from "../../store/store";
import type { CategoryMap } from "./categories.types";
import { createSelector } from "reselect";
import { CategoriesState } from "./categories.reducer";

const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategoriesSlice = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories
);

export const selectCategories = createSelector(
  [selectCategoriesSlice],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectIsCategoryLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);
