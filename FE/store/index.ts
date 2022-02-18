// store생성 &&  wrapper 생성

import {
  configureStore,
  Action,
  ThunkAction,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import axios from 'axios';
import getConfig from 'next/config';
import reducer from './reducers';

// axios.defaults.baseURL = getConfig().publicRuntimeConfig.apiServerUrl; // about axios default setting

const store = () =>
  // store를 생성함.
  configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
    ],
  });
// 생선된 store를 wrapper를 통해 바인딩
export const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV !== 'production',
});
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store>;
export type AppDispatch = ReturnType<typeof store>['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
