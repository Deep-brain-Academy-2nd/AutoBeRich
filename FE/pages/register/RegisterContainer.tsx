import React from 'react';
import registerAPI from '../../apis/register';
import RegisterPresenter from './RegisterPresenter';
import Router from 'next/router';
type req = {
  email: string;
  name: string;
  password: string;
  accessKey: string;
  secretKey: string;
};

const RegisterContainer = () => {
  const registerHandleSubmit: any = (e: any) => {
    try {
      e.preventDefault();
      const body: req = {
        email: e.currentTarget.email.value,
        name: e.currentTarget.name.value,
        password: e.currentTarget.password.value,
        accessKey: e.currentTarget.access_key.value,
        secretKey: e.currentTarget.secret_key.value,
      };

      const result = registerAPI.register(body);
      // if (res.status === 200){
      //   Router.replace('/')
      // }
      return result;
    } catch (error) {
      // 회원가입 에러처리
      console.error(error);
    }
  };
  return <RegisterPresenter handleSubmit={registerHandleSubmit} />;
};

export default RegisterContainer;
