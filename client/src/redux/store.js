import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice.js";
import configReducer from "./slice/config.slice.js";
import panelReducer from "./slice/panel.slice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  config: configReducer,
  panel: panelReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["config", "panel"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

  export const persistor = persistStore(store);
