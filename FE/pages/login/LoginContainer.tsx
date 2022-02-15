import LoginPresenter from './LoginPresenter';
import Router from 'next/router';
import { useAppDispatch } from '../../store/hooks';
import { getUserInfo } from '../../store/reducers/userInfo';
import loginAPI from '../../apis/login';
type req = {
	email: string;
	password: string;
};

const LoginContainer = () => {
	const dispatch = useAppDispatch();
	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const email = e.currentTarget.email.value;
			const body: req = {
				email,
				password: e.currentTarget.password.value,
			};

			// const res: any = await API.post('users/login', body);
			const res = await loginAPI.login(body);

			if (res.code === 200) {
				const token = res.token,
					name = res.name;

				localStorage.setItem('email', email);
				localStorage.setItem('token', token);
				localStorage.setItem('name', name);
				dispatch(getUserInfo({ name, email, token }));
				Router.replace('/');
			} else {
				alert('login 실패');
			}
		} catch (error) {
			// if (error.message.indexOf('401')) {
			alert('아이디가 없습니다. 가입 후 진행해주세요.');
			// 	return;
			// }
			// console.error(error);
			new Error('Failure Login');
		}
	}
	return <LoginPresenter handleSubmit={onSubmit} />;
};

export default LoginContainer;
