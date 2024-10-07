import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; // Importing redux-persist for state persistence
import storage from "redux-persist/lib/storage"; // Default storage engine (local storage)

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Storage engine used
};

// Creating a persisted reducer using the expensesReducer
const persistedReducer = persistReducer(persistConfig, expensesReducer);

// Configuring the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions for serialization checks
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Creating a persistor for managing the persisted state
export const persistor = persistStore(store);
export default store;
