// store생성 &&  wrapper 생성

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import axios from 'axios';
import getConfig from 'next/config';
import reducer from './reducers';

axios.defaults.baseURL = getConfig().publicRuntimeConfig.apiServerUrl;

const makeStore = () =>
  // store를 생성함.
  configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
    ],
  });
// 생선된 store를 wrapper를 통해 바인딩
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
