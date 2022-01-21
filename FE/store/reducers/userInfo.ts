import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
type initStateType = {
  email: string;
  name: string;
  token: string;
};
const initialState: initStateType = { email: '', name: '', token: '' }; // 초기 상태 정의

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      const { email, name, token } = action.payload;
      state.email = email;
      state.name = name;
      state.token = token;
    },
  },
});

export const selectInfo = (state: initStateType) => state;
// 액션 생성함수 export default counterSlice.reducer; // 리듀서
export const { getUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
