import loginAPI from '../../apis/login';
import LoginPresenter from './LoginPresenter';
import Router from 'next/router';
import API from '../../apis';
import { useAppDispatch } from '../../store/hooks';
import { getUserInfo } from '../../store/reducers/userInfo';
type req = {
  email: string;
  password: string;
};

const LoginContainer = () => {
  const dispatch = useAppDispatch();
  async function onSubmit(e: any) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const body: req = {
      email,
      password: e.currentTarget.password.value,
    };
    const res: any = await API.post('users/login', body);
    // const res: any = loginAPI.login(body).then((re) => console.log(re));

    if (res && res.data.code === 200) {
      const token = res.data.token,
        name = res.data.name;

      localStorage.setItem('email', email);
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      dispatch(getUserInfo({ name, email, token }));
      Router.replace('/');
    } else {
      alert('login 실패');
    }
  }
  return <LoginPresenter handleSubmit={onSubmit} />;
};

export default LoginContainer;
