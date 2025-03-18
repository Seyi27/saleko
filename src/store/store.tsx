import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "../services/appApi";
import authValueReducer from "../slice/authValueSlice";
import createAccountDataReducer from "../slice/createAccountDataSlice";
import userDetailsReducer from "../slice/userDetailsSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { productsApi } from "../services/productsApi";

const reducer = combineReducers({
  authValue: authValueReducer,
  createAccountData: createAccountDataReducer,
  userDetails: userDetailsReducer,

  [authApi.reducerPath]: authApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    'authValue', // key name to match combineReducers
  ],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, appApi.middleware, productsApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
