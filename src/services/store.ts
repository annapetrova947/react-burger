import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from './reducers/rootReducer';
import {TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux} from "react-redux";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
  
  
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export const useDispatch = () => useDispatchRedux<AppDispatch>();
  export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;