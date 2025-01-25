import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import baseApi from "./api/baseApi";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    // auth reducer
    auth: persistedAuthReducer,

    // baseApi reducer
    [baseApi.reducerPath]: baseApi.reducer,
  },

  // middleware
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
