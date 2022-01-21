import loginAPI from '../../apis/login';
import LoginPresenter from './LoginPresenter';

const LoginContainer = () => {
  async function onSubmit(e: any) {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await loginAPI.login(body);

    return res;
  }
  return <LoginPresenter handleSubmit={onSubmit} />;
};

export default LoginContainer;
