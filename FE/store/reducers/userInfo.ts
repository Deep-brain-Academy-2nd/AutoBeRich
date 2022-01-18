import { createSlice } from '@reduxjs/toolkit';

const initialState = { email: '', name: '', money: {} }; // 초기 상태 정의

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfo: (state) => {
      state.email = '1';
    },
  },
});

// 액션 생성함수 export default counterSlice.reducer; // 리듀서
export const { getUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
