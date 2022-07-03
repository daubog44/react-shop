import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesSlice = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories
);

export const selectCategories = createSelector(
  [selectCategoriesSlice],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
