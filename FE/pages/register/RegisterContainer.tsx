import React from 'react';
import registerAPI from '../../apis/register';
import RegisterPresenter from './RegisterPresenter';

const RegisterContainer = () => {
  const registerHandleSubmit: any = async (e: any) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
      accessKey: e.currentTarget.access_key.value,
      secretKey: e.currentTarget.secret_key.value,
    };

    const result = await registerAPI.register(body);
    console.log(result, 'Container');
    return result;
  };
  return <RegisterPresenter handleSubmit={registerHandleSubmit} />;
};

export default RegisterContainer;
