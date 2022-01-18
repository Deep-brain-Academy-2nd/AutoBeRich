import loginAPI from '../../apis/login';
import LoginPresenter from './LoginPresenter';
import Router from 'next/router';

type req = {
  email: string;
  password: string;
};

const LoginContainer = () => {
  async function onSubmit(e: any) {
    e.preventDefault();
    const body: req = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await loginAPI.login(body);
    // if (res.status === 200){
    //   Router.replace('/')
    // }
    return res;
  }
  return <LoginPresenter handleSubmit={onSubmit} />;
};

export default LoginContainer;
