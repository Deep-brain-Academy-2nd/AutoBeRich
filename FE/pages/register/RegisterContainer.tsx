import React from 'react';
import RegisterPresenter from './RegisterPresenter';
import Router from 'next/router';
import registerAPI from '../../apis/register';
type req = {
	email: string;
	name: string;
	password: string;
	accessKey: string;
	secretKey: string;
};
// React.FormEvent<HTMLFormElement>
// interface tempType {React.FormEvent<HTMLFormElement>}
interface tempType {
	preventDefault: Function;
	currentTarget: {
		email: { value: string };
		name: { value: string };
		password: { value: string };
		accessKey: { value: string };
		secretKey: { value: string };
	};
}
const RegisterContainer = () => {
	const registerHandleSubmit = async (e: tempType) => {
		try {
			e.preventDefault();

			// 에러처리
			if (!e.currentTarget.email.value) {
				alert('email을 입력해주세요');
				return;
			} else if (!e.currentTarget.name.value) {
				alert('name을 입력해주세요');
				return;
			} else if (!e.currentTarget.password.value) {
				alert('password 입력해주세요');
				return;
			} else if (!e.currentTarget.accessKey.value) {
				alert('accessKey을 입력해주세요');
				return;
			} else if (!e.currentTarget.secretKey.value) {
				alert('secretKey을 입력해주세요');
				return;
			} else if (e.currentTarget.email.value.indexOf('@') == -1) {
				alert('email 형식이 아닙니다. @을 입력해주세요.');
				return;
			}

			const body: req = {
				email: e.currentTarget.email.value,
				name: e.currentTarget.name.value,
				password: e.currentTarget.password.value,
				accessKey: e.currentTarget.accessKey.value,
				secretKey: e.currentTarget.secretKey.value,
			};

			// const res: any = await API.post('users/signup', body);
			const res = await registerAPI.register(body);

			if (res.code === 200) {
				alert('가입에 성공하였습니다.');
				Router.replace('/login');
			} else if (res.code === 400) {
				alert('이름, 패스워드 형식이 틀렸습니다.');
				return;
			} else if (res.code === 409) {
				alert('이미 가입하였습니다.');
				return;
			}
			// return result;
		} catch (e) {
			// 회원가입 에러처리
			new Error('Register Error');
		}
	};
	return <RegisterPresenter handleSubmit={registerHandleSubmit} />;
};

export default RegisterContainer;
