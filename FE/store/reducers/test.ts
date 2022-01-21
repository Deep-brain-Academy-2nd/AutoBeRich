import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 }; // 초기 상태 정의

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// 액션 생성함수 export default counterSlice.reducer; // 리듀서
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
