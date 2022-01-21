import loginAPI from '../../apis/login';
import LoginPresenter from './LoginPresenter';
import Router from 'next/router';
import API from '../../apis';

type req = {
  email: string;
  password: string;
};

const LoginContainer = () => {
  async function onSubmit(e: any) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const body: req = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res: any = await API.post('users/login', body);

    // const res: any = loginAPI.login(body).then((re) => console.log(re));

    if (res && res.data.code === 200) {
      Router.replace('/');
      console.log(res.data.name, res.data);
      localStorage.setItem('email', email);
      localStorage.setItem('token', res.data.token);
    } else {
      alert('login 실패');
    }
  }
  return <LoginPresenter handleSubmit={onSubmit} />;
};

export default LoginContainer;
