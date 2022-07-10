import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

// root-reducer
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== "production" ? logger : "",
  sagaMiddleware,
];

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      serialize: true,
      trace: true,
    })) ||
  compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middlewares));

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user", "categories"],
  // timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, null, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
