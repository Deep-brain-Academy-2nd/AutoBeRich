import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const LoginMain = styled.div`
  color: #fff;
  height: 88%;
  size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('/images/background.png');
`;

function LoginPresenter({ handleSubmit }) {
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  // useEffect(() => {
  //   // redirect to home if user is authenticated
  //   if (user) router.push('/');
  // }, [user]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginMain>
        <h1>로그인</h1>
        <div className="logWrapper">
          <form onSubmit={handleSubmit}>
            {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
            <div className="form-floating mb-2">
              <label htmlFor="email">이메일 주소</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="이메일 주소"
              />
            </div>
            <div className="form-floating mb-2">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="비밀번호"
              />
            </div>
            <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">
              로그인
            </button>
          </form>
          <Link href="/register">가입하기</Link>
          <Link href="/forget-password">
            <a>Forget password</a>
          </Link>
        </div>
      </LoginMain>
    </>
  );
}

export default LoginPresenter;
