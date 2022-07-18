export enum CATEGORIES_ACTION_TYPE {
  FETCH_CATEGORIES_START = "FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "FETCH_CATEGORIES_FAILED",
}

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  items: CategoryItem[];
  title: string;
  imageUrl: string;
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};
