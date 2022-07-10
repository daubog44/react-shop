import { createSelector } from "reselect";

const selectCategoryHomeReducer = (state) => state.categoriesHome;

export const selectCategoriesHomeSlice = createSelector(
  [selectCategoryHomeReducer],
  (categories) => categories.categories
);

export const selectCategoriesHome = createSelector(
  [selectCategoriesHomeSlice],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, imageUrl, id } = category;
      acc[title.toLowerCase()] = { imageUrl, id };
      return acc;
    }, {})
);

export const selectIsCategoryLoading = createSelector(
  [selectCategoryHomeReducer],
  (categories) => categories.isLoading
);
