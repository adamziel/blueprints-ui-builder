import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import stepsReducer from './steps';

export const store = configureStore({
  reducer: {
    steps: stepsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const StepsProvider: React.FC<any> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
