import { createAction, ActionType, createReducer } from 'typesafe-actions';

// 상태의 타입 선언
interface TestReducer {
  no: number;
  text: string;
}

// 상태 초기화
const initialState: TestReducer = {
  no: 0,
  text: 'hello',
};

// 액션타입 선언
export const RESET_TEXT = 'testReducer/RESET_TEXT';
export const ADD_TEXT = 'testReducer/ADD_TEXT';
export const REMOVE_TEXT = 'testReducer/REMOVE_TEXT';

// 액션함수 선언
export const resetText = createAction(RESET_TEXT)();
export const addText = createAction(ADD_TEXT)<TestReducer>();
export const removeText = createAction(REMOVE_TEXT)();

// 액션 객체타입
export const actions = { resetText, addText, removeText };
type TestReducerActions = ActionType<typeof actions>;

// 리듀서 추가
const testReducer = createReducer<TestReducer, TestReducerActions>(
  initialState,
  {
    [RESET_TEXT]: () => ({
      no: 0,
      text: '',
    }),
    [ADD_TEXT]: (state, action) => {
      console.log(state.text);
      return {
        no: action.payload.no,
        text: action.payload.text,
      };
    },
    [REMOVE_TEXT]: (state) => ({
      no: state.no,
      text: '',
    }),
  }
);

export default testReducer;
