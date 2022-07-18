import { Key } from "react";
export enum CATEGORIES_HOME_ACTION_TYPE {
  FETCH_CATEGORIES_HOME_START = "FETCH_CATEGORIES_HOME_START",
  FETCH_CATEGORIES_HOME_SUCCESS = "FETCH_CATEGORIES_HOME_SUCCESS",
  FETCH_CATEGORIES_HOME_FAILED = "FETCH_CATEGORIES_HOME_FAILED",
}

export type CategoryHome = {
  id: Key;
  imageUrl: string;
  title: string;
};

export type CategoryHomeMap = {
  [key: string]: CategoryHome;
};
