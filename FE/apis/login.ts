import API from '.';
import { AxiosResponse } from 'axios';
import axios from 'axios';

type Data = {
	email: string;
	password: string;
};
const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

const loginAPI = {
	login: async (obj: Data) => {
		try {
			const result = await API.post('users/login', obj).then((res: AxiosResponse) => {
				return res.data;
			});
			return result;
		} catch (error) {
			// console.error(error);
			new Error('Failure Login');
		}
	},
	checkAccessToken: async () => {
		const accessToken = localStorage.getItem('accessToken'),
			email = localStorage.getItem('email'),
			refreshToken = localStorage.getItem('refreshToken');
		// const expiredTime: any = localStorage.getItem('expiredTime');
		// if (expiredTime < 10000) {
		// new api
		const obj = { email, refreshToken };
		await API.post('users/verify', obj, {
			headers: {
				'x-access-token': accessToken,
			},
		}).then((res: any) => {
			try {
				console.log(res.data);
				if (res.data.accessToken) {
					localStorage.setItem('accessToken', res.data.accessToken);
				}
				if (res.data.code === 206) {
					loginAPI.logout();
				}
			} catch (error) {
				// Login 페이지로 리디렉션
				new Error('Retry Login plz');
				return false;
			}
		});
		// }
		return true;
		// return new Promise(function (resolve, reject) {
		// 	resolve(true);
		// });
	},
	logout: async () => {
		const refreshToken = localStorage.getItem('refreshToken');
		const req = { refreshToken };
		await API.post('users/logout', req);
		localStorage.removeItem('name');
		localStorage.removeItem('email');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('expiredTime');
	},

	// onLogin: ({ email, password }: Data) => {
	//   const data = {
	//     email,
	//     password,
	//   };
	//   API.post('/login', data)
	//     .then(onLoginSuccess)
	//     .catch((error) => {
	//       // ... 에러 처리
	//     });
	// },

	// onSilentRefresh: () => {
	//   API.post('/silent-refresh', data)
	//     .then(onLoginSuccess)
	//     .catch((error) => {
	//       // ... 로그인 실패 처리
	//     });
	// },

	// onLoginSuccess: (response) => {
	//   const { accessToken } = response.data;

	//   // accessToken 설정
	//   API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

	//   // accessToken 만료하기 1분 전에 로그인 연장
	//   setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000);
	// },
};

export default loginAPI;
