import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Make sure to import the reducer here
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Redux persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combining reducers
const rootReducer = combineReducers({
  auth: authReducer, // Use the reducer (not the slice itself)
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
