import { combineReducers, Store } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import thunk from "redux-thunk";
//import logger from 'redux-logger';
import storage from "redux-persist/lib/storage";

import LoaderReducer from "./Reducers/Loader.reducer";
import OrderReducer from "./Reducers/Order.reducer";
import CustomerReducer from "./Reducers/Customer.reducer";
import ColorReducer from "./Reducers/Color.reducer";
import AvatarReducer from "./Reducers/Avatar.reducer";
import CollabReducer from "./Reducers/Collab.reducer";
import ProductReducer from "./Reducers/Product.reducer";

import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["loaderState"],
};

let rootReducer = combineReducers({
  loader: LoaderReducer,
  order: OrderReducer,
  customer: CustomerReducer,
  color: ColorReducer,
  avatar: AvatarReducer,
  collab: CollabReducer,
  product: ProductReducer,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);

//const middlewareList = [thunk, logger]

const createReduxStore = () => {
  const store: Store<any, any> = configureStore({
    reducer: persistedReducer,
    //devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  });

  const persistor = persistStore(store);
  return { store, persistor };
};
export default createReduxStore;
export type RootStore = ReturnType<typeof rootReducer>;
