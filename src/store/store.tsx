import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/main.slice";
import cartReducer from "./reducers/cart.slice";
import creareSagaMiddlware from "redux-saga";
import { rootWatcher } from "./saga";

const sagaMiddleware = creareSagaMiddlware();

const rootReducer = combineReducers({
  mainReducer,
  cartReducer,
});

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {},
      }).concat(sagaMiddleware),
    devTools: true,
  });

  sagaMiddleware.run(rootWatcher);

  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppSote = ReturnType<typeof setupStore>;
export type AppDispatch = AppSote["dispatch"];
