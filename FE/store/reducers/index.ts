// 통합 리듀서 모듈

import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import getUserInfo from './userInfo';
const reducer = (
	state: CombinedState<{ getUserInfo: { email: string; name: string; token: string } }> | undefined,
	action: AnyAction
) => {
	// ssr 작업 수행시 HYDRATE라는 액션을 통해서 서버의 스토어와 클라이언트 스토어를 합쳐주는 역할
	if (action.type === HYDRATE) {
		return {
			...state,
			...action.payload,
		};
	}
	// 리듀서 모듈들을 합쳐주는 역할
	return combineReducers({
		/* 여기에 reducer 추가 */

		getUserInfo,
	})(state, action);
};

export default reducer;
