import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const ReduxStoreProvider: React.FC<any> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
